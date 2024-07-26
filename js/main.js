$(window).on('load', function() {
    // Fancybox.js init
    $('[data-fancybox]').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        prevEffect: 'none',
        nextEffect: 'none',
        arrows: false,
        helpers: {
            media: {},
            buttons: {}
        }
    });

    // wow.js init
    wow = new WOW({
        animateClass: 'animated',
        mobile: false,
        offset: 100
    });
    wow.init();  // Use wow.init() instead of new WOW().init()

    // Other existing code...
});

