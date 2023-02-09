$(function () {

    /* Preloader */
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');

    /* Parallax */
    if($('#scene')[0]) {
        if ($(document).width() > 1199) {
            var scene = $('#scene').get(0);
            var parallaxInstance = new Parallax(scene);
        }
    }

    /* Slider */
    if($('#slider')[0]) {
        var mySwiper = new Swiper('.swiper-container', {

            direction : 'horizontal',
            slidesPerView : 1,
            loop : true,
            observer : true,
        
            navigation : {
                nextEl : '.controls__btn_next',
                prevEl : '.controls__btn_prev',
            },
        
            breakpoints : {
                320 : {
                    slidesPerView : 1
                },
                768 : {
                    slidesPerView : 2
                },
                1200 : {
                    slidesPerView : 3
                }
            }
        })
    }

    /* Map */
    if($('#map')[0]) {
        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [55.802776, 37.583751],
                zoom: 17,
                controls: []
            });

            var myPlacemark = new ymaps.Placemark([55.802776, 37.583751],{iconCaption: 'Бутырская улица, 62'}, {
                iconColor: '#f00',
                preset: 'island#dotIcon'
            });
            myMap.geoObjects.add(myPlacemark);
            if(window.matchMedia('(min-width:768px').matches) {
                var position = myMap.getGlobalPixelCenter();
                myMap.setGlobalPixelCenter([position[0] + 200, position[1]]);
            }
        }
    }

    /* Validation */
    $('.form').validate({
        rules : {
            email : {
                required : true,
                email : true
            }
        },
        messages : {
            email: {
                required : 'Пожалуйста, заполните это поле',
                email : 'Пожалуйста, введите корректный адрес email'
            }
        }
    })
    $('.modal-window__form').validate({
        rules : {
            name : {
                required : true
            },
            phone : {
                required : true,
                digits : true,
                minlength : 10,
                maxlength : 11
            }
        },
        messages : {
            name: 'Пожалуйста, введите Ваше имя',
            phone : 'Пожалуйста, введите Ваш номер'
        }
    })
})

/* Fixed Head */
var navigation = $('.navigation'),
    navigationHeight = navigation.innerHeight(),
    main = $('.main'),
    mainPaddingTop = main.css('paddingTop');
    mainPaddingTopNumber = parseInt(mainPaddingTop);
    nav = $('.nav');
    navPaddingTop = nav.css('paddingTop');
    navPaddingTopNumber = parseInt(navPaddingTop);

$(window).on('scroll resize', function () {
    var pixelTop = $(window).scrollTop();
    
    if (pixelTop > 0 && $(document).width() > 991) {
        $('.navigation').addClass('active');
        main.css({'paddingTop' : navigationHeight + mainPaddingTopNumber + 'px'});
        nav.css({'paddingTop' : navigationHeight + navPaddingTopNumber + 'px'});
    } else if (pixelTop < 1) {
        $('.navigation').removeClass('active');
        main.css({'paddingTop' : mainPaddingTop});
        nav.css({'paddingTop' : navPaddingTop});
    }
})

/* Hamburger */
$('.menu-hamburger').on('click', function () {
    $('.hamburger').toggle();
})

$('.hamburger-menu__btn').on('click', function () {
    $('.hamburger').hide();
})

/* Modal Window */
$('.feedback__btn, .feedback__link:first-child, .btn-consultation, .connection-block__btn').on('click', function (e) {
    e.preventDefault();
    $('.hamburger').hide();
    $('.modal-window').addClass('d-flex');
})

$('.modal-window__btn:first-child').on('click', function () {
    $('.modal-window').removeClass('d-flex');
})

/* Smooth Scrolling */
$(".go").click(function (e) {
    e.preventDefault();
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;
    $("body,html").animate({scrollTop: destination }, 800);
});

/* Tabs */
$('.tabs__item').on('click', function () {
    var currTab = $(this).index();

    $('.tabs__item').removeClass('active');
    $(this).addClass('active');

    $('.tab-content').removeClass('active');
    $('.tab-content').eq(currTab).addClass('active');
})