// block - селектор анимируемого блока
// nameAnimation - название анимации
// durationAnimate - время проигрывания анимации
// borderShow - сдвиг срабатывания анимации 



$(document).ready(function () {

  var windowHeight = $(window).height();

  function showAnimate(block, nameAnimation, durationAnimate, borderShow) {
    $(document).on('scroll', function () {
      $(block).each(function () {
        var self = $(this),
          height = self.offset().top + borderShow;
        if ($(document).scrollTop() + windowHeight >= height) {
          self.addClass(nameAnimation).css({ 'animation-duration': durationAnimate })
        }
      });
    });
  }

  showAnimate('#animate-left', 'fadeInLeft', '2s', 0);
  showAnimate('#animate-right-b', 'fadeInRight', '1.6s', 0);
  showAnimate('#animate-right-b-2', 'fadeInRight', '2s', 0);
  showAnimate('#animate-right-l', 'fadeInLeft', '1.6s', 0);
  showAnimate('#animate-right-l-2', 'fadeInLeft', '2s', 0);
  showAnimate('#animate-left-1', 'fadeInLeftBig', '1.6s', -40);
  showAnimate('#animate-left-2', 'fadeInLeftBig', '1.6s', 0);
  showAnimate('#animate-right-1', 'fadeInRightBig', '1.6s', -40);
  showAnimate('#animate-right-2', 'fadeInRightBig', '1.6s', 40);
  showAnimate('#aimate-offer-r', 'fadeInRightBig', '1.6s', 40);
  showAnimate('#aimate-offer-l-1', 'fadeInLeftBig', '1.6s', 0);
  showAnimate('#aimate-offer-l-2', 'fadeInLeftBig', '3.2s', 0);
  showAnimate('#aimate-offer-u-1', 'fadeInUp', '1.6s', 0);
  showAnimate('#aimate-testimonial-d-1', 'fadeInDown', '1.6s', 0);
  showAnimate('#aimate-testimonial-d-2', 'fadeInDown', '1.6s', 0);
  showAnimate('#aimate-testimonial-l-1', 'fadeInRight', '1.5s', 0);
  showAnimate('#aimate-testimonial-l-2', 'fadeInRight', '2s', 0);
  $(".btn_menu").click(function (e) {
    e.preventDefault();
    $(".nav-bar").addClass("active");
  });

  $(".close_menu").click(function (e) {
    e.preventDefault();
    $(".nav-bar").removeClass("active");
  });

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
  });

  // Элемент, куда вы хотите записать страницы
  let pages = $('.pagingInfo');
  // Элемент слайдера
  let slider = $('.slider-for');

  slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

    let i = (currentSlide ? currentSlide : 0) + 1;
    pages.html('0' + i + '<span>/ 0' + slick.slideCount + '</span>');
  });

  $('.slider-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    arrows: false
  });


  $(window).scroll(function () {
    if ($(window).width() > 1200) {
      if ($(this).scrollTop() > 5) {
        $('.navigation').addClass('scroll');
        $('.navigation .col-xxxl-12').addClass("col-4");
        $('.navigation .col-xxxl-12').removeClass("col-xxxl-12 col-xxl-12 col-xl-12");
        $('.navigation .logo_desc').hide();
      } else {
        $('.navigation').removeClass('scroll');
        $('.navigation .col-4').addClass("col-xxxl-12 col-xxl-12 col-xl-12");
        $('.navigation .logo_desc').show();
      }
    }

  });


  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return item.el.attr('title') + '<small>Вадим Окунин</small>';
      }
    }
  });

  $('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});


});

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = "August 01 2020 00:00:00 GMT+0300";
initializeClock('clockdiv', deadline);


function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}


// Выбираем все ссылки с хэшем
$('a[href*="#"]')
  /* Убираем ненужные, либо те которые нужны для других целей, например для галерей, так что сюда можешь добавить список хешей на который плавный скролл не будет реагировать */
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // Проверяем что все хеши на том домене
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Находим цель
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Существует ли целевой элемент?
      if (target.length) {
        // Блокируем поведение по умлочанию, только в случае если анимация на понадобилась
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Меняем фокус (бывает полезно, обычно не мешает)
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Получил ли целевой элемент фокус
            return false;
          } else {
            $target.attr('tabindex', '-1');
            $target.focus();
          };
        });
      }
    }
  });