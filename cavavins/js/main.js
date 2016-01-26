$(document).ready(function(){

	//Disable form submit on "enter"
	$('form').on('keyup keypress', function(e) {
	  var code = e.keyCode || e.which;
	  if (code == 13) { 
	    e.preventDefault();
	    return false;
	  }
	});

	//Hide main block
	$("#blockNewWine").hide();
	$("#blockData").hide();
	$("#blockWine").hide();


	//Clear the form if it is not (Add vs Edit)
	$("#btnAddWine").click(function(){
		if($('#legendFrmWine').text()==="Edit wine"){
			$('#legendFrmWine').text("Add wine");
			$("#idWine").val("");
	        $("#nameWine").val("");
	        $("#grapesWine").val("");
	        $("#countryWine").val("");
	        $("#regionWine").val("");
	        $("#yearWine").val("");
	        $("#textWine").val("");
	        $("#btSend").attr({title: "btSend"});
	        $("#btSend").text("Save");
	        $("#btDelete").remove();
			$("#blockNewWine").show("slow");

		} else {
			$("#blockNewWine").show("slow");
		}
	});

	//Hide block when we close.
	$("#btnCloseNewWine").click(function(){
		$("#blockNewWine").hide("slow");
	});
	$("#btnCloseWine").click(function(){
		$("#blockWine").hide("slow");
	});


	//Message Status

	//Valid
	function showConfirmMessage(keyword){
		$div = $("<div></div>");
		$($div).text("Done ! Your wine has been "+keyword+" successfully ! (You will be redirected)");
		$($div).addClass("alert alert-success col-md-4 col-md-offset-4");
		$span = $("<span></span>");
		$($span).addClass("glyphicon glyphicon-remove rightFloat");
		$($span).attr("id","btnCloseAlert");
		$($div).append($span);
		$($div).attr("id","boxAlert");
		$('.moreSpace').before($div);
		$($span).click(function(){
			$("#boxAlert").hide("slow");
		});
		window.setTimeout(function() {
		    window.location.href = 'index.htm';
		}, 3000);
		$("html, body").animate({ scrollTop: 0 }, "slow");
	}

	//Unvalid
	function showRefuteMessage(keyword){
		$div = $("<div></div>");
		$strong = $("<strong>Well done !</strong>");
		$($div).before($strong);
		$($div).text("Oh snap! Please, try "+keyword+" again later! (You will be redirected)");
		$($div).addClass("alert alert-danger col-md-4 col-md-offset-4");
		$span = $("<span></span>");
		$($span).addClass("glyphicon glyphicon-remove rightFloat");
		$($span).attr("id","btnCloseAlert");
		$($div).append($span);
		$($div).attr("id","boxAlert");
		$('.moreSpace').before($div);
		$($span).click(function(){
			$("#boxAlert").hide("slow");
		});
		window.setTimeout(function() {
		    window.location.href = 'index.htm';
		}, 3000);
		$("html, body").animate({ scrollTop: 0 }, "slow");
	}

	//AJAX - Load Method
	$("#blockData").load(".././wines/connect.php", function(responseTxt, statusTxt, xhr){
	        if(statusTxt == "success")
	        	dataObject = JSON.parse(responseTxt);
	        	
	        	//SideBar
	        	$ul = $("ul");
	        	for(var i=0; i<dataObject.length; i++){
	        		$a = $("<a>"+dataObject[i].name+"</a>");
	        		$a.attr("href","#");
	        		$li = $("<li></li>");
	        		$li.attr("id",dataObject[i].id);
	        		$li.addClass("sheetWine");

	        		//Create content of the BlockWine
	        		$($li).mouseenter(function(){
	        			var liSelect = $(this);
						for(var j=0; j<dataObject.length; j++){
	        				if(liSelect[0].id === dataObject[j].id){
	        					$("#imgWine").attr("src","http://localhost:81/SlimProject/wines/front/img/"+dataObject[j].picture);
	        					$("#imgWine").attr("alt",dataObject[j].name);
	        					$("#note").text(dataObject[j].description);
	        				}	
	        			}
						$("#blockWine").show("slow");

					//Create content of the BlockNewWine
					}).click(function(){
						var liSelect = $(this);
						for(var j=0; j<dataObject.length; j++){
	        				if(liSelect[0].id === dataObject[j].id){
	        					$('#legendFrmWine').text("Edit wine");
	        					$("#idWine").attr({"disabled":true});
	        					$("#idWine").val(dataObject[j].id);
	        					$("#nameWine").val(dataObject[j].name);
	        					$("#grapesWine").val(dataObject[j].grapes);
	        					$("#countryWine").val(dataObject[j].country);
	        					$("#regionWine").val(dataObject[j].region);
	        					$("#yearWine").val(dataObject[j].year);
	        					$("#textWine").val(dataObject[j].description);
	        					$("#btSend").attr({title: "btEdit"});
	        					$("#btSend").text("Edit");
	        				}	
	        			}
	        			//Create a Delete Button if it doesn't exist
	        			if(!($("#btDelete").length)){
		        			$btnDelete = $("<span>Delete</span>");
		        			$($btnDelete).attr({
							  class: "btn mybtn-careful",
							  id : "btDelete",
							  name: "btDelete"
							});
							$($btnDelete).val("Delete wine");
		        			$("#frmWine").append($btnDelete);

		        			/** 	Function Delete				**/

		        			$($btnDelete).click(function(){
								var idVal = $("#idWine").val();

								//AJAX - DELETE Method
								$.ajax({
								  	url: "http://localhost:81/SlimProject/wines/"+idVal,
								  	method: "DELETE"
								}).done(function( data ) {
								    if(data=="valid"){
	
										showConfirmMessage("delete");
						
								  	} else if(data=="unvalid") {
					
								  		showRefuteMessage("delete");
								  	
								  	} else if(data=="404") {
		
					  					window.location.href = 'http://localhost:81/SlimProject/cavavins/404.htm';
			
					  				} else if(data=="400") {
					
					  					window.location.href = 'http://localhost:81/SlimProject/cavavins/400.htm';
					  				}
								});
							});
	        			}
	        			$("#blockNewWine").show("slow");
					});
	        		$li.append($a);
	        		$ul.append($li);
	        	}
	           
	        if(statusTxt == "error")
	            alert("Error: " + xhr.status + ": " + xhr.statusText);
	});

	/** 	Function Search				**/
	$("#btnSearch").click(function(){

		if($(".liFind").length){
			$(".liFind").removeClass("liFind");
		}

		//Recup Input Data
		var mot = $('#inputSearch').val();
		mot = mot.toUpperCase();

		if(mot !== ""){

			//AJAX - GET Method
			$.get("http://localhost:81/SlimProject/wines/search/"+mot, function( data ) {

				if(data !== "unvalid"){
					var dataObject = JSON.parse(data);
					for(var i=0; i<(dataObject.length); i++){
						var idSeek = dataObject[i].id;
						$li = $("#"+idSeek);
						$($li).addClass("liFind");
						$("#imgWine").attr("src","http://localhost:81/SlimProject/wines/front/img/"+dataObject[i].picture);
						$("#imgWine").attr("alt",dataObject[i].name);
						$("#note").text(dataObject[i].description);
						$("#blockWine").show("slow");
					}
				}
			});
		} else if(mot==""){
			$(".liFind").removeClass("liFind");
		}

	});

/** 	Function Search	 on keyup			**/
	$("#inputSearch").keyup(function(){
		var value = $('#inputSearch').val();
		value = value.toUpperCase();
		$("ul").empty();
		if(value !== ""){

			//AJAX - GET Method
			$.get("http://localhost:81/SlimProject/wines/searchBy/"+value, function( data ) {
				if(data !== "unvalid"){
				var dataObject = JSON.parse(data);
				//Recreate - SideBar
	        	$ul = $("ul");
	        	for(var i=0; i<dataObject.length; i++){
	        		$a = $("<a>"+dataObject[i].name+"</a>");
	        		$a.attr("href","#");
	        		$li = $("<li></li>");
	        		$li.attr("id",dataObject[i].id);
	        		$li.addClass("sheetWine");

	        		//Create content of the BlockWine
	        		$($li).mouseenter(function(){
	        			var liSelect = $(this);
						for(var j=0; j<dataObject.length; j++){
	        				if(liSelect[0].id === dataObject[j].id){
	        					$("#imgWine").attr("src","http://localhost:81/SlimProject/wines/front/img/"+dataObject[j].picture);
	        					$("#imgWine").attr("alt",dataObject[j].name);
	        					$("#note").text(dataObject[j].description);
	        				}	
	        			}
						$("#blockWine").show("slow");

					//Create content of the BlockNewWine
					}).click(function(){
						var liSelect = $(this);
						for(var j=0; j<dataObject.length; j++){
	        				if(liSelect[0].id === dataObject[j].id){
	        					$('#legendFrmWine').text("Edit wine");
	        					$("#idWine").attr({"disabled":true});
	        					$("#idWine").val(dataObject[j].id);
	        					$("#nameWine").val(dataObject[j].name);
	        					$("#grapesWine").val(dataObject[j].grapes);
	        					$("#countryWine").val(dataObject[j].country);
	        					$("#regionWine").val(dataObject[j].region);
	        					$("#yearWine").val(dataObject[j].year);
	        					$("#textWine").val(dataObject[j].description);
	        					$("#btSend").attr({title: "btEdit"});
	        					$("#btSend").text("Edit");
	        				}	
	        			}
	        			//Create a Delete Button if it doesn't exist
	        			if(!($("#btDelete").length)){
		        			$btnDelete = $("<span>Delete</span>");
		        			$($btnDelete).attr({
							  class: "btn mybtn-careful",
							  id : "btDelete",
							  name: "btDelete"
							});
							$($btnDelete).val("Delete wine");
		        			$("#frmWine").append($btnDelete);

		        			/** 	Function Delete				**/

		        			$($btnDelete).click(function(){
								var idVal = $("#idWine").val();

								//AJAX - DELETE Method
								$.ajax({
								  	url: "http://localhost:81/SlimProject/wines/"+idVal,
								  	method: "DELETE"
								}).done(function( data ) {
								    if(data=="valid"){
	
										showConfirmMessage("delete");
						
								  	} else if(data=="unvalid") {
					
								  		showRefuteMessage("delete");
								  	
								  	} else if(data=="404") {
		
					  					window.location.href = 'http://localhost:81/SlimProject/cavavins/404.htm';
			
					  				} else if(data=="400") {
					
					  					window.location.href = 'http://localhost:81/SlimProject/cavavins/400.htm';
					  				}
								});
							});
	        			}
	        			$("#blockNewWine").show("slow");
					});
	        		$li.append($a);
	        		$ul.append($li);
	        	}

				}
			});
		} else if(value==""){
			//AJAX - GET Method
			$.get("http://localhost:81/SlimProject/wines/", function( data ) {
				if(data !== "unvalid"){
					var dataObject = JSON.parse(data);
					//Recreate - SideBar
		        	$ul = $("ul");
	        		for(var i=0; i<dataObject.length; i++){
	        			$a = $("<a>"+dataObject[i].name+"</a>");
	        			$a.attr("href","#");
	        			$li = $("<li></li>");
	        			$li.attr("id",dataObject[i].id);
	        			$li.addClass("sheetWine");
	
	        			//Create content of the BlockWine
	        			$($li).mouseenter(function(){
	        				var liSelect = $(this);
							for(var j=0; j<dataObject.length; j++){
	        					if(liSelect[0].id === dataObject[j].id){
	        						$("#imgWine").attr("src","http://localhost:81/SlimProject/wines/front/img/"+dataObject[j].picture);
	        						$("#imgWine").attr("alt",dataObject[j].name);
	        						$("#note").text(dataObject[j].description);
	        					}	
	        				}
							$("#blockWine").show("slow");
	
						//Create content of the BlockNewWine
						}).click(function(){
							var liSelect = $(this);
							for(var j=0; j<dataObject.length; j++){
	        					if(liSelect[0].id === dataObject[j].id){
	        						$('#legendFrmWine').text("Edit wine");
	        						$("#idWine").attr({"disabled":true});
	        						$("#idWine").val(dataObject[j].id);
	        						$("#nameWine").val(dataObject[j].name);
	        						$("#grapesWine").val(dataObject[j].grapes);
	        						$("#countryWine").val(dataObject[j].country);
	        						$("#regionWine").val(dataObject[j].region);
	        						$("#yearWine").val(dataObject[j].year);
	        						$("#textWine").val(dataObject[j].description);
	        						$("#btSend").attr({title: "btEdit"});
	        						$("#btSend").text("Edit");
	        					}	
	        				}
	        				//Create a Delete Button if it doesn't exist
	        				if(!($("#btDelete").length)){
		        				$btnDelete = $("<span>Delete</span>");
		        				$($btnDelete).attr({
								  class: "btn mybtn-careful",
								  id : "btDelete",
								  name: "btDelete"
								});
								$($btnDelete).val("Delete wine");
		        				$("#frmWine").append($btnDelete);
	
		        				/** 	Function Delete				**/
	
		        				$($btnDelete).click(function(){
									var idVal = $("#idWine").val();

								//AJAX - DELETE Method
									$.ajax({
									  	url: "http://localhost:81/SlimProject/wines/"+idVal,
									  	method: "DELETE"
									}).done(function( data ) {
									    if(data=="valid"){
		
											showConfirmMessage("delete");
							
									  	} else if(data=="unvalid") {
						
									  		showRefuteMessage("delete");
									  	
									  	} else if(data=="404") {
			
					  						window.location.href = 'http://localhost:81/SlimProject/cavavins/404.htm';
				
					  					} else if(data=="400") {
						
					  						window.location.href = 'http://localhost:81/SlimProject/cavavins/400.htm';
					  					}
									});
								});
	        				}
	        			$("#blockNewWine").show("slow");
					});
	        		$li.append($a);
	        		$ul.append($li);
	        	}

				}
			});
		}
	});

	/**			Validator			**/
	function validate(champs){	//Name, Grapes, Country, Region
		var patt = new RegExp('^([a-zA-Z \/"]){1,}$');
		if(patt.test(champs)){
			return true;
		} else {
			return false;
		}
	}
	function validateNumber(champs){ //Year
		var patt = new RegExp('^([0-9]){4}$');
		if(patt.test(champs) && champs>1000){
			return true;
		} else {
			return false;
		}
	}
	function validateDesc(champs){ //Description
		var patt = /^([a-zA-Z ,.\n!-?"']){3,}$/gi;
		if(patt.test(champs)){
			return true;
		} else {
			return false;
		}
	}
	/** 		Function AddWine 		**/

	$("#btSend").click(function(){
			//Recup title (Add vs Edit)
			var name = $("#btSend").attr("title");
			
			//Recup data input
			var idVal = $("#idWine").val();
	        var nameVal = $("#nameWine").val();
	        var grapesVal = $("#grapesWine").val();
	        var countryVal = $("#countryWine").val();
	        var regionVal = $("#regionWine").val();
	        var yearVal = $("#yearWine").val();
	        var textVal = $("#textWine").val();

	    if(validate(nameVal) && validate(grapesVal) && validate(countryVal) && validate(regionVal) && validateNumber(yearVal) && validateDesc(textVal)){
			if(name==="btSend"){
				
				//AJAX - Post Method
				$.post( "http://localhost:81/SlimProject/wines/",{ 
					name: nameVal,
					grapes: grapesVal,
					country: countryVal,
					region: regionVal,
					year: yearVal,
					description: textVal
	
				},function( data ) {
				  	if(data=="valid"){
	
						showConfirmMessage("save");
		
				  	} else if(data=="unvalid") {
	
				  		showRefuteMessage("submitting");
				  	} else if(data=="404") {
	
				  		window.location.href = 'http://localhost:81/SlimProject/cavavins/404.htm';

				  	} else if(data=="400") {
	
				  		window.location.href = 'http://localhost:81/SlimProject/cavavins/400.htm';
				  	}
				});
	
			}else if(name==="btEdit"){
				
				//AJAX - Put method
				$.ajax({
			        url: 'http://localhost:81/SlimProject/wines/'+idVal,
			        type: "PUT",
			        contentType: "application/json",
			        processData: "false",
			        data:'{"nameVal":"'+nameVal+'","grapesVal":"'+grapesVal+'","countryVal":"'+countryVal+'","regionVal":"'+regionVal+'","yearVal":"'+yearVal+'","textVal":"'+textVal+'"}',
			        success: function(data) {
				        if(data=="valid"){
		
							showConfirmMessage("edited");
			
					  	} else if(data=="unvalid") {
		
					  		showRefuteMessage("editing");

					  	} else if(data=="404") {
		
					  		window.location.href = 'http://localhost:81/SlimProject/cavavins/404.htm';

					  	} else if(data=="400") {
		
					  		window.location.href = 'http://localhost:81/SlimProject/cavavins/400.htm';
					  	}
			        }
					
				});
			}

		} else {
			alert("Please, fill the form correctly.");
		}


	});
});
