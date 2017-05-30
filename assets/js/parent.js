(function() {
    'use strict';

    var $ = window.jQuery,
        console = window.console,
        userAgent = window.navigator.userAgent.toLowerCase(),
        isMobileBrowser = userAgent.indexOf('mobile') > -1;


    if (!isMobileBrowser) { return; }





    //-- Events

    var $body = $('body');

    // show more event
    $body.on('click', '.show-more', function(e){
        var $showMoreBtn = $(e.currentTarget),
            $showLessBtn = $('.show-less');

        // NOTE: move functionality into closeItem function
        if ($showLessBtn.length) {
            $showLessBtn.siblings('ul').hide();
            $showLessBtn.removeClass('show-less').addClass('show-more').html('+');
        }

        $showMoreBtn.siblings('ul').show();
        $showMoreBtn.removeClass('show-more').addClass('show-less').html('-');
    });

    // show less event
    $body.on('click', '.show-less', function(e){
        var $showLessBtn = $(e.currentTarget);

        // NOTE: move functionality into closeItem function
        $showLessBtn.siblings('ul').hide();
        $showLessBtn.removeClass('show-less').addClass('show-more').html('+');
    });






    //-- Methods

    function addCateoryClasses(){
        var $primaryCategory = $('.primary-category');

        $('.primary-category ul li').addClass('secondary-category');
        $primaryCategory.has('ul').prepend('<button class="show-more">+</button>');
    }

    function createDonateCategory(){
        var $donate = $('#parent-header-donate').html('<span>donate</span>');
        addToNav($donate, 'primary-category', true);
    }



    function injectSocialIcons(){
        var $icons = $('#header .socialButton').empty(),
            $wrappedIcons = $icons.wrapAll('<div class="social-elements"></div>');

        addToNav($icons.parent(), 'social-list');
    }



    function addToNav($content, className, prepend){
        var $nav = $('#nav'),
            $newContent = $content.wrap('<li></li>').parent();

        if (className){
            $newContent.addClass(className);
        }

        if (prepend){
            $nav.prepend($newContent);
        } else {
            $nav.append($newContent);
        }
    }


    // TODO: init
    addCateoryClasses();
    createDonateCategory();
    injectSocialIcons();
}());
