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
        $('#nav button').fadeToggle(150);
    });


    //-- Methods

    function addCateoryClasses(){
        var $primaryCategory = $('.primary-category'),
            $primaryWithSecondary = $primaryCategory.has('ul');

        $('.primary-category ul li').addClass('secondary-category');
        addShowMoreBtn($primaryWithSecondary, true, 'primary-category-btn');
    }

    function createDonateCategory(){
        var $donate = $('#parent-header-donate').html('<span>donate</span>');
        addToNav($donate, 'primary-category', true);
    }


    function injectSocialIcons(){
        var $icons = $('#header .socialButton').empty(),
            $footer = $('.footer-section.primary'),
            $wrappedIcons;

        $icons.wrapAll('<div class="social-elements"></div>');
        $wrappedIcons = $icons.parent();

        // add to nav
        addToNav($wrappedIcons, 'social-list');

        // add to footer
        $footer.append($wrappedIcons.clone());
    }


    function injectSubCategories(){
        var $subCategories = $('.treemenu');

        if (!$subCategories.length){ return; }

        $subCategories.each(function() {
            var $subCategory = $(this),
                subCategoryData = $subCategory.data('sub-category'),
                $secondaryCategory = $('#parent-menu #nav').find('[data-sub-category="' + subCategoryData + '"]');

            $subCategory.find('a').wrapInner('<span></span>');
            $secondaryCategory.append($subCategory);

            addShowMoreBtn($secondaryCategory, false, 'secondary-category-btn');
        });
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

    function addShowMoreBtn($element, showMore, extraClass){
        var buttonClass = showMore ? 'show-more' : 'show-less',
            buttonConent = showMore ? '+' : '-';

        $element.prepend('<button class="' + buttonClass + '">' + buttonConent + '</button>');

        if (extraClass) {
            $element.find('button').addClass(extraClass);
        }
    }


    // TODO: init
    addCateoryClasses();
    createDonateCategory();
    injectSocialIcons();
    injectSubCategories();
}());
