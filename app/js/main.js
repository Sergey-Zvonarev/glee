$(function () {
    $('.navigation__btn--burgermenu').on('click', function () {
        $('.product-card').toggleClass('product-card--list')
    })
    // Липкий header при скроле 
    // ==================================
// var header = $('.header__top'),
// cloneHeader = header.clone();
// cloneHeader.addClass('header__top--fixed');
// header.before(cloneHeader);

// $(window).scroll(function () {
//     console.log($(window).scrollTop());

//     if ($(window).scrollTop() >100) {
//         cloneHeader.addClass('header__top--scroll');
//     }
//     else {
//          cloneHeader.removeClass('header__top--scroll');
//     }
// })
//======================================

// Клонирвоание класса + липкий heder
var header = $('.header__top');

$(window).scroll(function () {
    console.log($(window).scrollTop());

    if ($(window).scrollTop() > 100) {
        header.addClass('header__top--scroll');
    } else {
        header.removeClass('header__top--scroll');
    }
})



    $(".filter-price__input").ionRangeSlider({
        type: "double",
        postfix: "00",
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
        starWidth: "12px",
        normalFill: '#d6d6d6',
        ratedFill: '#ffcc00',
        spacing: "4px",
        readOnly: true
    });

    $('.star-list').rateYo({
        starWidth: "16px",
        normalFill: '#d6d6d6',
        ratedFill: '#ffcc00',
        spacing: "10px",
        readOnly: true
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