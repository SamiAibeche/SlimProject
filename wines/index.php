<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

    /*
    Before all : Create  a .htacess file -> 
    	-> In the same folder of index.php
    	-> On slim/docs.com
    	-> Click on "web serveur" -> apache config
    */
require 'getData.php';
require 'vendor/autoload.php';

//Red Beans
require "rb.php";

$app = new \Slim\App;

//Initialisation des données de connexions
R::setup( 'mysql:host=localhost;dbname=wine','root', 'root' );


    /** Function GetAllWine  - GET **/

$app->get('/', function (Request $request, Response $response) {

    //Méthode finAll de redBean (retourne un objet de tous les vins)
    $wines = R::findAll( 'wine' );
    try{

      //Méthode exportAll (transforme l'objet en tableau)
      $arrays = R::exportAll( $wines );

        //Return data
        if(!empty($arrays)){
            $dataStr = json_encode($arrays, JSON_PRETTY_PRINT);
            echo $dataStr;
        } else {
            echo "unvalid";
        }

    //IF 404 - 500 
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }
});

    
      /** Function OrderBy - GET **/

$app->get('/orderby/{order}', function (Request $request, Response $response) {
    
    try{

        //Recup - Initializing data 
        $order = $request->getAttribute('order');

        //Méthode finAll de redBean (retourne un objet de tous les vins ordonés par $order)
        $wines = R::findAll( 'wine' , ' ORDER BY '.$order.'' );

        //Méthode exportAll (transforme l'objet en tableau)
        $arrays = R::exportAll( $wines );
        //Return data
        if(!empty($arrays)){
            $dataStr = json_encode($arrays, JSON_PRETTY_PRINT);
            echo $dataStr;
        } else {
            echo "unvalid";
        }

    //IF 404 - 500 
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }
});


    /**     Function Search  - GET    **/

$app->get('/search/{word}', function (Request $request, Response $response) {
    try{

        //Recup - Initializing data 
        $word = $request->getAttribute('word');

        //Méthode findOne de redBean (retourne un objet du vin recherché)
        $wines = R::findOne( 'wine' , ' name = ? ', [ $word ]);

        //Méthode exportAll (transforme l'objet en tableau)
        $arrays = R::exportAll( $wines );

        //Return data
        if(!empty($arrays)){
            $dataStr = json_encode($arrays, JSON_PRETTY_PRINT);
            echo $dataStr;
        } else {
            echo "unvalid";
        }


    //IF 404 - 500 
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }

});

    /**     Function Search  - GET    **/

$app->get('/searchBy/{letter}', function (Request $request, Response $response) {
    try{

        //Recup - Initializing data 
        $letter = $request->getAttribute('letter');

        //Méthode find de redBean (retourne un objet des vin recherchés)
        $wines = R::find( 'wine' , ' name LIKE ? ', [ $letter.'%' ]);

        //Méthode exportAll (transforme l'objet en tableau)
        $arrays = R::exportAll( $wines );
        
        //Return data
        if(!empty($arrays)){
            $dataStr = json_encode($arrays, JSON_PRETTY_PRINT);
            echo $dataStr;
        } else {
            echo "unvalid";
        }

    //IF 404 - 500 
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }
});
    /** Génère tous les vins de la BDD selon l'ID donné en paramètre  - GET **/

$app->get('/{id}', function (Request $request, Response $response) {

    try {
      
        //Recup - Initializing data 
        $id = $request->getAttribute('id');

        //Méthode load de redBean (retourne un objet du vin recherché selon l'ID)
        $wine = R::load('wine',$id);

        //Méthode exportAll (transforme l'objet en tableau)
        $arrays = R::exportAll( $wine );

        //Return data
        if(!empty($arrays)){
            $dataStr = json_encode($arrays, JSON_PRETTY_PRINT);
            echo $dataStr;
        } else {
            echo "unvalid";
        }
    //IF 404 - 500 
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }
});


    /**     Function AddWine - POST   **/

$app->post('/', function (Request $request, Response $response) {
    //flag
    $id = false;

    try {
      
        //Recup & Initializing data 
        $name = strtoupper($_POST["name"]);
        $grapes = $_POST["grapes"];
        $country = $_POST["country"];
        $region = $_POST["region"];
        $year = $_POST["year"];
        $description = $_POST["description"];

        if(isset($_POST["picture"])){
            $img = $_POST["picture"];
        } else {
            $img = "default.jpg";
        }

        //Create a newWine
        $newWine = R::dispense( 'wine' );

        //Add properties
        $newWine->name = $name;
        $newWine->grapes = $grapes;
        $newWine->country = $country;
        $newWine->region = $region;
        $newWine->year = $year;
        $newWine->description = $description;
        $newWine->picture = $img;

        //Store in the database
        $id = R::store( $newWine );

        //Return data
        if($id!==false){
            echo "valid";
        } else {
            echo "unvalid";
        }
    //IF 404 - 500 
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }
    
});


    /**     Function EditWine  - PUT  **/

$app->put('/{id}', function (Request $request, Response $response) {
  $id = false;
    try {
      
      //Recup data
      $idWine = $request->getAttribute('id');
      $mediaType = $request->getMediaType();
      $body = $request->getBody();  
      if ($mediaType == 'application/xml') {
        $input = simplexml_load_string($body);
      } elseif ($mediaType == 'application/json') {    
        $input = json_decode($body);
      }
      
      //Initializing data
      $name = $input->nameVal;
      $grapes = $input->grapesVal;
      $country = $input->countryVal;
      $region = $input->regionVal;
      $year = $input->yearVal;
      $description = $input->textVal; 
      
      //Load the wine by ID
      $idWine = (int) $idWine;
      $wineToUpdate = R::load('wine', $idWine);

      //Add properties
      
      $wineToUpdate->name = $name;
      $wineToUpdate->grapes = $grapes;
      $wineToUpdate->country = $country;
      $wineToUpdate->region = $region;
      $wineToUpdate->year = $year;
      $wineToUpdate->description = $description;

      //Store in the database
     $id =  R::store( $wineToUpdate );
      //Return data
     
      if($id!==false){
          echo "valid";
      } else {
          echo "unvalid";
      }
      
    //IF 404 - 500  
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }
});

    /**     Function DeleteWine - DELETE   **/

$app->delete('/{id}', function (Request $request, Response $response) {
    $id = false;
    try {
        //Recup data
        $id = $request->getAttribute('id');
        $idWine = (int) $id;

        //Load the wine by id
        $wineToDelete = R::load('wine', $idWine);

        //Delete in the database
        $id =  R::trash($wineToDelete);

        if($id!==false){
            echo "valid";
        } else {
            echo "unvalid";
        }
    //IF 404 - 500 
    } catch (ResourceNotFoundException $e) {
      echo "404";
    } catch (Exception $e) {
      echo "400";
    }
});


$app->run();