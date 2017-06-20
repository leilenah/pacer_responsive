/*jshint loopfunc:true */
/*jshint -W087 */

(function() {
    'use strict';

var $ = window.jQuery,
  console = window.console;

var $body = $('body');

$(function(){
    $('#tabs').click(function(){
        $('.ui-tabs-nav').show();
    });
    $('.ui-tabs-nav a').click(function(e){ //Anytime you click on a tab
         $('#tabs').text($(this).text());
         $('.ui-tabs-nav').hide();
        $(this).addClass('current'); //if its the current class the other navs are hidden
        e.preventDefault();
    });
});

dropdown.init();

}());
