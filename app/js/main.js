$(function () {

    $(".filter-price__input").ionRangeSlider({
        type: "double",
        prefix: "$",
        onStart: function (data) {
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
        },
        onChange: function (data) {
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
        },
    });

    $('.trendy__slider').slick({
        arrows: false,
        dots: true,
        // fade: true,
        // autoplay: true
    });

    $('.partners__list').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true
    });



    $('.js-popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    $('.star').rateYo({
        rating: 3.6,
        // normalFill: '#d6d6d6',
        // ratedFill: '#ffcc00',
    });
    
    $('.menu__burger').on('click', function () {
        $('.menu__list').toggleClass('menu__list--active');
        $('.menu__burger').toggleClass('menu__burger--active');
    });

    let mixerPopular = mixitup('.popular__content', {
        selectors: {
            control: '.js-popular-btn'
        }
    });

    let mixerDesign = mixitup('.design__inner', {
        selectors: {
            control: '.js-design-btn'
        }
    });

});