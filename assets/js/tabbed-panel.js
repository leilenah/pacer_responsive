(function() {
    'use strict';

    var $ = window.jQuery,
        console = window.console,
        userAgent = window.navigator.userAgent.toLowerCase(),
        isMobileBrowser = userAgent.indexOf('mobile') > -1;

    if (!isMobileBrowser) { return; }

    //-- Events
    var $body = $('body');

    $body.on('click', '.tabbedPanel-showMore', function(e){
        var $tabbedPanelBtn = $(e.currentTarget),
            $tabs = $tabbedPanelBtn.closest('.tabbedPanel').find('.ui-tabs-nav'),
            $arrow = $tabbedPanelBtn.find('.arrow');

        $tabs.slideToggle(300);
        $arrow.toggleClass('up');
        $arrow.toggleClass('down');
    });


    $body.on('click', '.ui-tabs-anchor', function(e){
        var $tabAnchor = $(e.currentTarget),
            $activeTab = $tabAnchor.closest('.tabbedPanel').find('.active-tab-text'),
            $activeTabText = $tabAnchor.html();

        // TODO: move to function
        $activeTab.html($activeTabText);
    });

    $('.mover').click(function(e){
        var $moverBtn = $(e.currentTarget),
            $currentTab = $moverBtn.closest('.ui-tabs-panel'),
            $newTab;

        if ($moverBtn.hasClass('next-tab')){
            $newTab = $currentTab.next();
            console.log('next tab');
        } else {
            $newTab = $currentTab.prev();
            console.log('prev tab');
        }

        var $activeTab = $newTab.closest('.tabbedPanel').find('.active-tab-text'),
            $activeTabText = $newTab.find('h2').html();

        // TODO: move to function
        $activeTab.html($activeTabText);
    });



    function injectTabbedPanelBar(){
        var $tabbedPanels = $('.tabbedPanel');

        $tabbedPanels.prepend('<div class="tabbedPanel-bar"></div>');
        $('.tabbedPanel-bar').html('<div class="active-tab-text"></div><button class="tabbedPanel-showMore"><div class="arrow up"></div></button>');
    }

    function setActiveTabs(){
        var $tabbedPanels = $('.tabbedPanel');

        $tabbedPanels.each(function(){
            var $tabbedPanel = $(this),
                $activeTab = $tabbedPanel.find('.active-tab-text'),
                $activeTabText = $tabbedPanel.find('.ui-state-active a').html();

            $activeTab.html($activeTabText);
        });
    }


    injectTabbedPanelBar();
    setActiveTabs();
}());
