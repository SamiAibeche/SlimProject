$(document).ready(function(){
	$("#BlockData").hide();

	//AJAX - Load Method
	$("#BlockData").load(".././connect.php", function(responseTxt, statusTxt, xhr){
	        if(statusTxt == "success"){
	        	dataObject = JSON.parse(responseTxt);

	        	//Create cells for each wines
	        	$mainDiv = $("#catalog");
	        	for(var i=0; i<dataObject.length; i++){
	        		$img = $("<img>");
	        		$img.attr("src","img/"+dataObject[i].picture);
	        		$img.attr("alt", dataObject[i].name);
	        		$img.attr("id", "img"+dataObject[i].id);
	        		$img.addClass("img-responsive col-md-6 col-md-offset-3 col-sm-offset-4 col-xs-offset-3");

	        		/******/
	        		$div = $("<div></div>");
	        		$p = $("<p><strong>"+dataObject[i].name+" - "+dataObject[i].year+"<strong></p>");
	        		$p.addClass("col-xs-8 col-xs-push-4 col-sm-10 col-sm-push-5 col-md-10 col-md-push-4 col-lg-12 col-lg-push-4");
	        		$div.attr("id","imgWine"+dataObject[i].id);
	        		$div.addClass("col-xs-12 col-sm-6 col-md-6 col-lg-4 sheet");

	        		$div.append($p);
	        		var idNumber = parseInt(dataObject[i].id);
	        		if(idNumber>6){
	        			$div.addClass("hideme");
	        		}

	        		/******/
	        		$($img).mouseenter(function(){
	        			$(this).css({
	        				"cursor" : "pointer"
	        			});
	        		}).click(function(){
					//Create a box

						//If she doesn't exist
	        			if(!($("#boxe").length)){

	        				//Recup the position of the parent
		        			var pos = $(this).offset();
		        			var x = pos.top;
		        			var y = pos.left;

		        			//Create
		        			$box = $("<div></div>");
		        			$box.attr("id", "boxe");
		        			$box.addClass("boxes row");

		        			//If it's the div on the right
		        			if(y>1100){
		        				y=950; //re-initialize y
		        			}
		        			$box.css({
		        				"position": "absolute",
							    "top": x+60,
							    "left": y+40,
							    "opacity":0.9
		        			});

		        			//Recup ID div - same of the name's image
		        			var imgId = this.id;
		        			var imgId = imgId.slice(-1);
		        			for(var i=0; i<dataObject.length; i++){
		        				if(imgId === dataObject[i].id ){

		        					//Div inside box
		        					$div = $("<div></div>");
					        		$div.addClass("col-xs-12 col-sm-6 col-md-12 col-lg-12");

					        		//Image
		        					$imgBox = $("<img>");
		        					$imgBox.attr("src","img/"+dataObject[i].picture);
	        						$imgBox.attr("alt", dataObject[i].name);
	        						$imgBox.addClass("img-responsive col-md-6");
	        						$imgBox.addClass("imgBox");

	        						//Cross
	        						$span = $("<span></span");
	        						$span.addClass("glyphicon glyphicon-remove");
	        						$span.attr("id","closeBox");

	        						//Text
	        						$pName = $("<h5><strong><u>"+dataObject[i].name+"</u></strong></h5>");
	        						$pYear = $("<p><strong>Millésime : </strong>"+dataObject[i].year+"</p>");
	        						$pGrapes = $("<p><strong>Grapes : </strong>"+dataObject[i].grapes+"</p>");
	        						$pCountry = $("<p><strong>Country : </strong>"+dataObject[i].country+"</p>");
	        						$pRegion = $("<p><strong>Region : </strong>"+dataObject[i].region+"</p>");
	        						$pDesc = $("<p><strong>Description : </strong>"+dataObject[i].description+"</p>");

	        						//Append Child
	        						$div.append($imgBox);
	        						$div.append($span);
	        						$div.append($pName);
	        						$div.append($pYear);
	        						$div.append($pGrapes);
	        						$div.append($pCountry);
	        						$div.append($pRegion);
	        						$div.append($pDesc);

		        				}
		        			}

		        			$($box).hide();
		        			$box.append($div);
		        			$("body").append($box);
		        			$($box).show(1000);

		        			$("#closeBox").click(function(){
		        				$($box).fadeOut(1000);
		        				setTimeout(function(){
								    $("#boxe").remove();
								}, 1000);
		        			});

		        		//If not (if she exist)
		        		} else {
		        			$("#boxe").remove();
		        		}
	        		});

	        		$div.append($img);
	        		$mainDiv.append($div);
	        	
	        	}
	        }
	           
	        if(statusTxt == "error"){
	            alert("Error: " + xhr.status + ": " + xhr.statusText);
	        }
	});

	$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
	    $(window).scroll( function(){
	        /* Check the location of each desired element */
	        $('.hideme').each( function(i){
	            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
	            var bottom_of_window = $(window).scrollTop() + $(window).height();
	            /* If the object is completely visible in the window, fade it it */
	            if( bottom_of_window > bottom_of_object ){
	                $(this).animate({'opacity':'1'},600);       
	            }
	        }); 
	    });

	    $("#moveTop").click(function(){
	    	$("html, body").animate({ scrollTop: 0 }, "slow");
	    });
    
	});
		/**			Function OrderBy 			**/
		$(".navLink").click(function(){
	    	$name = $(this).attr("href");
	    	var name = $name.slice(1,($name.length));

	    	//AJAX - Get Method
	    	$.get( "http://localhost:81/SlimProject/wines/orderby/"+name, function( data ) {
	    	 var dataObject = JSON.parse(data);

	    	 $("#catalog").empty();
	    	 $mainDiv = $("#catalog");
	    	 for(var i=0; i<dataObject.length; i++){
	    	 $img = $("<img>");
	        		$img.attr("src","img/"+dataObject[i].picture);
	        		$img.attr("alt", dataObject[i].name);
	        		$img.attr("id", "img"+dataObject[i].id);
	        		$img.addClass("img-responsive col-md-6 col-md-offset-3 col-sm-offset-4 col-xs-offset-3");

	        		/******/
	        		$div = $("<div></div>");
	        		//Add Title + Year 
	        		$p = $("<p><strong>"+dataObject[i].name+" - "+dataObject[i].year+"<strong></p>");
	        		$p.addClass("col-xs-8 col-xs-push-4 col-sm-10 col-sm-push-5 col-md-10 col-md-push-4 col-lg-12 col-lg-push-4");
	        		$div.attr("id","imgWine"+dataObject[i].id);
	        		$div.addClass("col-xs-12 col-sm-6 col-md-6 col-lg-4 sheet");

	        		$div.append($p);
	        		var idNumber = parseInt(dataObject[i].id);
	        		if(i>5){
	        			$div.addClass("hideme");
	        		}

	        		/******/
	        		$($img).mouseenter(function(){
	        			$(this).css({
	        				"cursor" : "pointer"
	        			});
	        		}).click(function(){
					//Create a box

						//If she doesn't exist
	        			if(!($("#boxe").length)){

	        				//Recup the position of the parent
		        			var pos = $(this).offset();
		        			var x = pos.top;
		        			var y = pos.left;

		        			//Create
		        			$box = $("<div></div>");
		        			$box.attr("id", "boxe");
		        			$box.addClass("boxes row");

		        			//If it's the div on the right
		        			if(y>1100){
		        				y=950; //re-initialize y
		        			}
		        			$box.css({
		        				"position": "absolute",
							    "top": x+60,
							    "left": y+40,
							    "opacity":0.9
		        			});

		        			//Recup ID div - same of the name's image
		        			var imgId = this.id;
		        			var imgId = imgId.slice(-1);
		        			for(var i=0; i<dataObject.length; i++){
		        				if(imgId === dataObject[i].id ){

		        					//Div inside box
		        					$div = $("<div></div>");
					        		$div.addClass("col-xs-12 col-sm-6 col-md-12 col-lg-12");

					        		//Image
		        					$imgBox = $("<img>");
		        					$imgBox.attr("src","img/"+dataObject[i].picture);
	        						$imgBox.attr("alt", dataObject[i].name);
	        						$imgBox.addClass("img-responsive col-md-6");
	        						$imgBox.addClass("imgBox");

	        						//Cross
	        						$span = $("<span></span");
	        						$span.addClass("glyphicon glyphicon-remove");
	        						$span.attr("id","closeBox");

	        						//Text
	        						$pName = $("<h5><strong><u>"+dataObject[i].name+"</u></strong></h5>");
	        						$pYear = $("<p><strong>Millésime : </strong>"+dataObject[i].year+"</p>");
	        						$pGrapes = $("<p><strong>Grapes : </strong>"+dataObject[i].grapes+"</p>");
	        						$pCountry = $("<p><strong>Country : </strong>"+dataObject[i].country+"</p>");
	        						$pRegion = $("<p><strong>Region : </strong>"+dataObject[i].region+"</p>");
	        						$pDesc = $("<p><strong>Description : </strong>"+dataObject[i].description+"</p>");

	        						//Append Child
	        						$div.append($imgBox);
	        						$div.append($span);
	        						$div.append($pName);
	        						$div.append($pYear);
	        						$div.append($pGrapes);
	        						$div.append($pCountry);
	        						$div.append($pRegion);
	        						$div.append($pDesc);

		        				}
		        			}

		        			$($box).hide();
		        			$box.append($div);
		        			$("body").append($box);
		        			$($box).show(1000);

		        			$("#closeBox").click(function(){
		        				$($box).fadeOut(1000);
		        				setTimeout(function(){
								    $("#boxe").remove();
								}, 1000);
		        			});

		        		//If not (if she exist)
		        		} else {
		        			$("#boxe").remove();
		        		}
	        		});

	        		$div.append($img);
	        		$mainDiv.append($div);
	        	
	        	}
	    	 
	    	 
			});
	    }); 
});

