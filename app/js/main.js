$(function(){

    $('.trendy__slider').slick({
        arrows: false,
        dots: true,
        // fade: true,
        autoplay: true
    });

    var mixer = mixitup('.popular__content')

    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});