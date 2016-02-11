'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	// Lab 6 - Call the AJAX endpoint
	$.get("/project/" + idNumber, callback);
	// Lab 6 - Print URL being called
	console.log("/project/" + idNumber);

	console.log("User clicked on project " + idNumber);
}

// Lab 6 - Callback function
function callback(result) {
	$("#project" + result.id).find(".details").html(
		"<img src="+result.image+" alt='Lorem Pixel image' class='detailsImage'>" + 
		"<h1>"+result.title+"</h1> <h3>"+result.date+"</h3><br>" + result.summary
	);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	// Lab 6 - Make AJAX request with endpoint at /palette
	$.get("/palette", paletteCallback);
}

// Lab 6 - Palette callback function
function paletteCallback(result) {
	// Lab 6 - Put hex colors within js object into array
	var colors = result.colors.hex;
	// Lab 6 - Provided Javascript to apply above colors
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

