<?php 

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="css/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/viewCss.css">
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/viewJs.js"></script>
    <script src="css/js/bootstrap.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <title>Bar à vins</title>
    <style>
    .jumbotron{
        text-align: center
    }
    </style>
</head>
<body>
<div id="BlockData"></div>
<nav class="navbar navbar-default" role="navigation">
            
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#home">Show wine by :</a>
            </div>
        
           
            <div class="collapse navbar-collapse navbar-ex1-collapse myNav">
                <ul class="nav navbar-nav myNav">
                    <li><a class="navLink" href="#name">Name</a></li>
                    <li><a class="navLink" href="#year">Year</a></li>
                    <li><a class="navLink" href="#region">Region</a></li>
                    <li><a class="navLink" href="#country">Country</a></li>
                </ul>
            </div>
        </nav>
    <div class="jumbotron" id="home">
        <div class="container">
            <h1 class="mainTitre">Wine Bar</h1>
            <p>Wine from your area</p>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row" id="catalog">
            
        </div> 
    </div>
    <div class="row">
    <br/>
        <div id="divMoveTop" class="col-xs-2 col-xs-push-6  col-sm-1 col-md-1  col-lg-1">
            <a id="moveTop" href="#home"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></a>
        </div>
    </div>
</body>
</html>