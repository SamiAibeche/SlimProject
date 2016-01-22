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

//Initialisation du tableau de
while ($row = $reponse->fetch(PDO::FETCH_ASSOC)) {
      	 $data[] = $row;
}
