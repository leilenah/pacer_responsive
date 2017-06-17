(function() {
    'use strict';

    var $ = window.jQuery,
        console = window.console,
        userAgent = window.navigator.userAgent.toLowerCase(),
        isMobileBrowser = userAgent.indexOf('mobile') > -1;

    if (!isMobileBrowser) { return; }





    //-- Events
    // TODO: Refactor / bind

    var $body = $('body');

    // show more event -- primary category
    $body.on('click', '.show-more.primary-category-btn', function(e){
        var $showMoreBtn = $(e.currentTarget),
            $showLessBtn = $('.show-less.primary-category-btn');

        // NOTE: move functionality into closeItem function
        if ($showLessBtn.length && $showLessBtn) {
            $showLessBtn.siblings('ul').slideUp(150);
            $showLessBtn.removeClass('show-less').addClass('show-more').html('+');
        }

        // NOTE: move functionality into closeItem function
        $showMoreBtn.siblings('ul').slideDown(150);
        $showMoreBtn.removeClass('show-more').addClass('show-less').html('-');
    });

    // show less event -- primary category
    $body.on('click', '.show-less.primary-category-btn', function(e){
        var $showLessBtn = $(e.currentTarget);

        // NOTE: move functionality into closeItem function
        $showLessBtn.siblings('ul').slideUp(150);
        $showLessBtn.removeClass('show-less').addClass('show-more').html('+');
    });

    // show less event -- secondary category
    $body.on('click', '.show-less.secondary-category-btn', function(e){
        var $showLessBtn = $(e.currentTarget);

        // NOTE: move functionality into closeItem function
        $showLessBtn.siblings('ul').slideUp(150);
        $showLessBtn.removeClass('show-less').addClass('show-more').html('+');
    });

    // show less event -- secondary category
    $body.on('click', '.show-more.secondary-category-btn', function(e){
        var $showMoreBtn = $(e.currentTarget);

        // NOTE: move functionality into closeItem function
        $showMoreBtn.siblings('ul').slideDown(150);
        $showMoreBtn.removeClass('show-more').addClass('show-less').html('-');
    });


    // menu button functionality
    $body.on('click', '.menu-button', function(e){
        $('#nav').slideToggle(300); // TODO: roll slidetoggle out to buttons
        $('#nav button').fadeToggle(250);
    });


    //-- Methods

    function addCateoryClasses(){
        var $primaryCategory = $('.primary-category'),
            $primaryWithSecondary = $primaryCategory.has('ul');

        $('.primary-category ul li').addClass('secondary-category');
        addShowMoreBtn($primaryWithSecondary, true, 'primary-category-btn');
    }

    function createDonateCategory(){
        var $donate = $('.header-donate').html('<span>donate</span>');
        addToNav($donate, 'primary-category', true);
    }

    function createNewsletterCategory(){
        var $newsletter = $('.header-newsletter').html('<span>newsletter</span>');
        addToNav($newsletter, 'primary-category', true);
    }



    function injectSocialIcons($footer){
        if (!$footer.length) { return; }

        var $icons = $('.socialButton').empty(),
            $wrappedIcons;

        $icons.wrapAll('<div class="social-elements"></div>');
        $wrappedIcons = $icons.parent();

        // add to nav
        addToNav($wrappedIcons, 'social-list');

        // add to footer
        $footer.append($wrappedIcons.clone());
    }


    function injectTertiaryCategories($tertiaryCategories, $nav){
        if (!$tertiaryCategories.length){ return; }

        $tertiaryCategories.each(function() {
            var $tertiaryCategory = $(this),
                tertiaryCategoryData = $tertiaryCategory.data('tertiary-category'),
                $secondaryCategory = $nav.find('[data-tertiary-category="' + tertiaryCategoryData + '"]');

            $tertiaryCategory.find('a').wrapInner('<span></span>');
            $secondaryCategory.append($tertiaryCategory);

            addShowMoreBtn($secondaryCategory, false, 'secondary-category-btn');
        });



        console.log('tertiary injected');
    }

    function addToNav($content, className, prepend){

        // TODO: add class that can be globally used
        var $nav = $('.parent-nav').length ? $('.parent-nav') : $('.bullying-nav'),
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

    function addShowMoreBtn($element, showMore, extraClass){
        var buttonClass = showMore ? 'show-more' : 'show-less',
            buttonConent = showMore ? '+' : '-';

        $element.prepend('<button class="' + buttonClass + '">' + buttonConent + '</button>');

        if (extraClass) {
            $element.find('button').addClass(extraClass);
        }

        console.log('show more button added');
    }


    // TODO: init
    addCateoryClasses();

    // might combine into one
    createDonateCategory();
    createNewsletterCategory();


    //TODO: add class that can be globally used
    injectSocialIcons($('.footer-section.primary')); // parent
    injectSocialIcons($('#centerCol-links')); // bullying


    // tertiary categories
    //TODO: add class that can be globally used
    injectTertiaryCategories($('.treemenu'), $('#nav.parent-nav')); // parent
    injectTertiaryCategories($('.submenu'), $('.bullying-nav')); // bullying
}());
