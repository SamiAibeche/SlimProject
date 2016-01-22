<?php
 //Connexions à la base de données 

try
{
	$bdd = new PDO('mysql:host=localhost;dbname=wine;charset=utf8', 'root', 'root');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}

//Récupération des données de la BDD
 
//Préparation de la requête de recherche en BDD
$reponse = $bdd->query('SELECT * FROM `wine`');


while ($row = $reponse->fetch(PDO::FETCH_ASSOC)) {
      	 $data[] = $row;
}

//var_dump($data);
 
//Data sous forme de String
$dataStr =json_encode($data, JSON_PRETTY_PRINT);
echo $dataStr;

//Data sous forme d'Objet JSON
//$dataJson = json_decode($data); 
//var_dump($dataJson);
 
// Ecriture de l'objet JSON contenant les infos qui vont être renvoyées
//$id = $_GET['id'];
//header('Location: http://localhost:81/wines/'.$id.'');   
                                                   
$bdd = null;
?>