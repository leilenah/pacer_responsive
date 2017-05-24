/*jshint loopfunc:true */
(function() {
    'use strict';

    var $ = window.jQuery;

 // Classes and what not


//HOMEPAGE ACCORDION

$('.question').each(function(){ //wrap h3 in a div for accordion
    $(this).nextUntil('.question').wrapAll('<div class="test" />');
});

//JAVASCRIPT ACCORDIONG CODE FROM PACER LINES 14 -83 DOESNT EVEN WORK
//requires jQuery ver 1.43 or greater
jQuery(document).ready(function() {

	jQuery(".ExpandHeader").each(function(index, element) {

		//add accessibility aria-roles and tabindex
		jQuery(this).attr("role", "button");
		jQuery(this).attr("tabindex", "0");
	});

	jQuery(".ExpandHeader").click(function () {
		jExpandHeader = jQuery(this);
		jReadMore = jQuery(this).nextAll().find('.ReadMore').first();
		jReadMore.hide();

		//getting the next element
		jContent = jQuery(this).nextAll('.ExpandItem').first();

		//alert(jQuery(this).nextAll('.ExpandItem')[0].tagName);
		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
		jContent.slideToggle(700, function () {

			//execute this after slideToggle is done
			//change text of header based on visibility of content div
			jExpandHeader.toggleClass('ItemOpen');
			jContent.toggleClass('ItemOpen');
		});

	});

	jQuery(".ExpandHeader").bind('keypress',function (event){
		if (event.keyCode === 13){
				this.click();
		}
	});
});



// LIGHTBOX

function openModal() { //Used to open and close lightbox img and text when click on view img link
  document.getElementByClassName('.fltrt').style.display = "block";
}

function closeModal() {
  document.getElementByClassName('.fltrt').style.display = "none";
}

}());

