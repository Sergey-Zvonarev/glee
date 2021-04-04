$(function () {
    $('.navigation__btn--burgermenu').on('click', function () {
        $('.product-card').toggleClass('product-card--list')
    })

    // Клонирвоание класса + липкий heder
    var header = $('.header');

    $(window).on('scroll', function () {
        console.log($(window).scrollTop());

        if ($(window).scrollTop() > 100) {
            header.addClass('header--scroll');
        } else {
            header.removeClass('header--scroll');
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
    });

    $('.partners__list').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 414,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    variableWidth: false,
                }
            },

        ],
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