$(function () {

    $('.trendy__slider').slick({
        arrows: false,
        dots: true,
        // fade: true,
        // autoplay: true
    });

    $('.partners__inner').slick({
        arrows: false,
    });

    let mixerPopular = mixitup('.popular__content', {
        selectors: {
            control: '.popular-btn'
        }
    });
    let mixerDesign = mixitup('.design__inner', {
        selectors: {
            control: '.design-btn'
        }
    });


    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    $('.star').rateYo({
        starWidth: "40px"
    });
});