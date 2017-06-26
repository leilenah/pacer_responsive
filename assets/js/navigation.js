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
        $('#nav, #navWrap').slideToggle(300); // TODO: roll slidetoggle out to buttons
        $('#nav button, #navWrap button').fadeToggle(250);
    });


    // quaternary category
    $body.on('click', '.quaternary-show-more', function(e){
        var $showMoreBtn = $(e.currentTarget);
        $showMoreBtn.removeClass('quaternary-show-more').addClass('quaternary-show-less').html('-');
        $showMoreBtn.parent().find('ul').slideDown(150);
    });

    $body.on('click', '.quaternary-show-less', function(e){
        var $showMoreBtn = $(e.currentTarget);
        $showMoreBtn.removeClass('quaternary-show-less').addClass('quaternary-show-more').html('+');
        $showMoreBtn.parent().find('ul').slideUp(150);
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


    // TODO: don't have this depend on footer, what
    function injectSocialIcons(){
        var $footer = $('.has-footer-social'),
            $icons = $('.socialButton').empty(),
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
    }

    function addToNav($content, className, prepend){
        // TODO: add class that can be globally used
        var $newContent = $content.wrap('<li></li>').parent(),
            $nav = $('.global-nav');

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
    }

    function injectQuaternaryNav(){
        // TODO: inject after search bar
        var $quaternaryCategories = $('.quaternary-category');

        $quaternaryCategories.each(function() {
            var $quaternaryCategory = $(this),
                $wrappedCategory = $quaternaryCategory.wrap('<div class="quaternary-category-wrapper"></div>');

            $wrappedCategory.find('a').first().after('<button class="quaternary-show-more">+</button><div class="divider"></div>');
            $wrappedCategory.find('a').wrapInner('<span></span>');
            $('.search-wrapper').after($wrappedCategory.parent());
        });


    }

    function injectSearchForm(){
        var $searchForm = $('#cse-search-box'),
            $searchSubmit = $('.search-submit');

        // TODO: figure out how to target broadly...perhaps make global classes
        $('#navWrap, #header').after($searchForm);
        $searchForm.wrap('<div class="search-wrapper"></div>');
        $searchSubmit.val('');

    }





    // TODO: init
    addCateoryClasses();

    // might combine into one
    createDonateCategory();
    createNewsletterCategory();



    injectSocialIcons();


    injectSearchForm();

    // tertiary categories
    //TODO: add class that can be globally used
    injectTertiaryCategories($('.treemenu'), $('#nav.parent-nav')); // parent
    injectQuaternaryNav(); // TODO: wrap all a text in spans
    injectTertiaryCategories($('.submenu.tertiary'), $('.bullying-nav')); // bullying



}());
