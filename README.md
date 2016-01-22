#### PROJET DE GROUPE SLIM #####
### Cave à vins - Wine Bar ###


* MEMBRES de l'équipe : Gabriel, Pablo, Léo, Lou, Sami


Avant toutes choses : Créer un fichier .htaccess dans le même dossier que celui ou se trouve le fichier index.php et y copier ces informations :

RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]


### Cave à vins -> Front-end : Interroge la BDD en passant par slim pour obtenir les data.

### Wine bar -> Back-end : Interronge la BDD pour générer les data et les renvoyer à cavavins.
### Wine bar -> Front-end : Génere un catalogue de toutes les data


### NOTE ! Le port utilisé dans ce projet est le "81" (http://localhost:81/SlimProject/cavavins/index.htm) 

