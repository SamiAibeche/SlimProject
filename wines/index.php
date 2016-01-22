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

$app = new \Slim\App;



    /** Function GetAllWine  - GET **/

$app->get('/', function (Request $request, Response $response) {
    include 'getData.php';
    try{

        //SQL Request (SELECT)
        $stmt = $bdd->query('SELECT * FROM `wine`');

        //Initializing  array data
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                 $wines[] = $row;
        }

        //Return data
        if(isset($wines)){
            $dataStr = json_encode($wines, JSON_PRETTY_PRINT);
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
    include 'getData.php';
    try{

        //Recup - Initializing data 
        $order = $request->getAttribute('order');

        //SQL Request (SELECT)
        $stmt = $bdd->query('SELECT * FROM `wine` ORDER BY '.$order.'');

        //Initializing  array data
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                 $wines[] = $row;
        }

        //Return data
        if(isset($wines)){
            $dataStr = json_encode($wines, JSON_PRETTY_PRINT);
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
    include 'getData.php';
    try{

        //Recup - Initializing data 
        $word = $request->getAttribute('word');

        //SQL Request (SELECT)
        $stmt = $bdd->query('SELECT * FROM `wine` WHERE name = "'.$word.'" LIMIT 1');

        //Initializing  array data
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                 $wines[] = $row;
        }
        
        //Return data
        if(isset($wines)){
            $dataStr = json_encode($wines, JSON_PRETTY_PRINT);
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
    include 'getData.php';
    try{

        //Recup - Initializing data 
        $word = $request->getAttribute('letter');

        //SQL Request (SELECT)
        $stmt = $bdd->query('SELECT * FROM `wine` WHERE name LIKE "'.$word.'%"');

        //Initializing  array data
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                 $wines[] = $row;
        }
        
        //Return data
        if(isset($wines)){
            $dataStr = json_encode($wines, JSON_PRETTY_PRINT);
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
    include 'getData.php';
    try {
      
        //Recup - Initializing data 
        $id = $request->getAttribute('id');
        
        //SQL Request (SELECT)
        $stmt = $bdd->query('SELECT * FROM `wine` WHERE id LIKE "%'.$id.'%"');

        //Initializing  array data
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $wines[] = $row;
        }

        //Return data
        if(isset($wines)){
            $dataStr = json_encode($wines, JSON_PRETTY_PRINT);
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
    include 'getData.php';
    try {
      
        //Recup - Initializing data 
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
        
        //SQL Request (INSERT)
        //Return data
        if($stmt = $bdd->query('INSERT INTO wine (name, year, grapes, country, region, description, picture) VALUES("'.$name.'", "'.$year.'", "'.$grapes.'", "'.$country.'", "'.$region.'", "'.$description.'", "'.$img.'")')){
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
    include 'getData.php';   
    try {
      
      //Recup data
      $id = $request->getAttribute('id');
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
      $descr = $input->textVal; 
      
      //SQL Request (UPDATE)
      $req = $bdd->prepare('UPDATE wine SET name=?, year=?, grapes=?, country=?, region=?, description=? WHERE id=?');
      $stmt = $req->execute(array($name, $year, $grapes, $country, $region, $descr, $id));  
      
      //Return data
      if($stmt){
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
    include 'getData.php';
    try {
        //Recup data
        $id = $request->getAttribute('id');

        //SQL Request (DELETE)
        $req = "DELETE FROM wine WHERE id=$id";
        $stmt = $bdd->query($req);

        //Return data
        if($stmt){
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