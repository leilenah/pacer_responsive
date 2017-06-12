/*jshint loopfunc:true */
/*jshint -W087 */

(function() {
    'use strict';

var $ = window.jQuery,
  console = window.console;

// var $cboxOverlay = $('#cboxOverlay');
//   $cboxOverlay.on('click', function(e){
//     $cboxOverlay.addClass('closeOverlay');
//   });
var $cboxElement = $('#cboxElement');
var $cboxOverlay = $('#cboxOverlay');
  $cboxElement.on('click', function(e){
    $cboxOverlay.addClass('closeOverlay');
  });



// $('#cboxOverlay').addClass('closeOverlay');
// console.log("#cboxOverlay " + $('#cboxOverlay').get(0));
// console.log($('.closeOverlay'));

// $('#cboxOverlay').append("<div class='closeIcon'>content</div>");

}());



// document.getElementById("demo").onclick = function() {myFunction()};

// function myFunction() {
//     document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
// }


// var $body = $('body');
//     $body.on('click', '.show-more', function(e){
//         var $showMoreBtn = $(e.currentTarget),
//             $showLessBtn = $('.show-less');
// }
