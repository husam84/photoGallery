$(document).ready(function() {
	
	var categories_template, category_template, animal_template;
	var breadcrumb_template;
	var current_category, current_animal;
	var $index = $(this).data("id");	
	
	// compile all of our templates ready for use
	var source;
	source = $("#categories-template").html();
	categories_template = Handlebars.compile(source);
	
	source = $("#category-template").html();
	category_template = Handlebars.compile(source);
	
	source = $("#animal-template").html();
	animal_template = Handlebars.compile(source);
	
	source = $("#breadcrumb-template").html();
	breadcrumb_template = Handlebars.compile(source);	
	
	//a helper function that instantiates a template
	// and displays the results in the content div
	function showTemplate(template, data){
		var html = template(data);
		$('#content').html(html);
	}
	
	// Run, when the webpage is loaded
	function showCategories() {
		showTemplate(categories_template, animals_data);
		$(".breadcrumb").children().filter(":gt(0)").remove();		
	}
	
	// Run, when we click on a category
	function showCategory() {
		showTemplate(category_template, current_category);		
		$(".breadcrumb").children().filter(":gt(1)").remove();
		
		$(".animal-thumbnail").click(function () {
			//get the index (position in the array) of the animal we clicked on
			$index = $(this).data("id");
			current_animal = current_category.animals[$index];
			
			//to append the breadcrumb with the name of the animal we clicked on
			$(".breadcrumb").append(breadcrumb_template({
				type: "animal",
				name: current_animal.name
			}));
			
			showTemplate(animal_template, current_animal);		
			showAnimal();
										
		});	
	}
	
	// Run, when we click on an animal-to show image in full size with overlay
	function showAnimal() {			
		var $source;		
		$(".image-1").click(function(){			
			 //get the scr of the animal's image we clicked on
			 $source = this.src
			 showOverlay();
		});
		
		$(".image-2").click(function(){			
			//get the scr of the animal's image we clicked on
			$source = this.src
			showOverlay();
		});
		
		function showOverlay(){	
			// generate the overlay div to be used when we click on an animal image
			// and it's styled with CSS
			var $overlay = $('<div id="overlay"></div>');
			var $image = $('<img>');
			
			//the attr src of the image comes from this, when we click on an image
			$image = $image.attr({"src": $source});
			
			$overlay.append($image[0]);
			$("body").append($overlay);
			$overlay.show();			
			
			$overlay.click(function(){	
				$overlay.hide();				
			});
		}
		
		$("#animal-crumb").click(function () {
			//this is just so that nothing happens (page blinking) 
			// when we click on the breadcrumb
			return false;				
		});			
	}	
	
	$("#categories-crumb").click(function () {
		showCategories();
		
		$(".category-thumbnail").click(function () {
			//get the index (position in the array) of the category we clicked on
			$index = $(this).data("id");
			current_category = animals_data.category[$index];
			
			//to append the breadcrumb with the name of the category we clicked on
			$(".breadcrumb").append(breadcrumb_template({
				type: "category",
				name: current_category.name
			}));
			
			// we need showCategory() twice, when we click on the category image,
			// or the category bread crumb
			showCategory();		
			
			$("#category-crumb").click(function () {
				  showCategory();
			});
		});
		//this is just so that nothing happens (page blinking) 
		// when we click on the breadcrumb
		return false;
	});
	
	// force a click when the webpage is first run
	$("#categories-crumb").click();	
});