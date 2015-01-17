$(document).ready(function() {
	// Anchor click, animate scrolling
	$("a").click(function() {
		var href = $(this).attr('href');
		// Only if anchor
		if (href.substr(0, 1) == "#") {
			// Get destination anchor top offset
			var topOffset = $(href).offset().top;
			// Animate
			$("body,html").animate({
				scrollTop: topOffset
			}, function completed() {
				// Set hash in the URL
				window.location.hash = href;
			});
			
			// Stop the browser from following the link
			return false;
		};
	});
});