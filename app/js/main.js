$(function () {

    $('.related__list').slick({
        slidesToShow: 4,
        infinite: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="images/content/icons/arrow-left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/content/icons/arrow-right.svg" alt=""></button>',
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 414,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                }
            },
        ],
    });

    $('.product-tabs__link').on('click', function (e) {
        e.preventDefault();
        $('.product-tabs__link').removeClass('product-tabs__link--active');
        $(this).addClass('product-tabs__link--active');

        $('.product-tabs__item').removeClass('product-tabs__item--active');
        $($(this).attr('href')).addClass('product-tabs__item--active');

    });

    $('.details-card__number').styler();

    $('.product-slide__min').slick({
        asNavFor: '.product-slide__big',
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        draggable: false
    });
    $('.product-slide__big').slick({
        asNavFor: '.product-slide__min',
        draggable: false,
        arrows: false,
        fade: true,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    draggable: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                }
            },

        ],
    });

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