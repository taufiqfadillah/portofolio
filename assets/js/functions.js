'use strict';
function toggleDarkMode() {
  darkModeToggle.checked ? (document.body.classList.add('dark-mode'), toggle.classList.add('active')) : (document.body.classList.remove('dark-mode'), toggle.classList.remove('active'));
}
var m,
  divId,
  initLatitude,
  initLongitude,
  map,
  $body = $('body');
$(window).on('load', function () {
  $body.addClass('loaded');
}),
  'true' === $body.attr('data-preloader') && $body.append($("<div class='preloader'><div><span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span></div></div>")),
  $('a[href^=\\#]').on('click', function (e) {
    e.preventDefault(), $('html,body').animate({ scrollTop: $(this.hash).offset().top + -24 }, 0);
  });
var toggleMenu = $('.toggle-menu');
if (toggleMenu.length) {
  var e = $('.menu-dots'),
    a = $('.toggle-close');
  e.on('click', function () {
    toggleMenu.hasClass('show') ? (toggleMenu.removeClass('show'), e.removeClass('active')) : (toggleMenu.addClass('show'), e.addClass('active'));
  }),
    a.on('click', function () {
      toggleMenu.removeClass('show'), e.removeClass('active');
    }),
    $(document).on('click', function (t) {
      0 === $(t.target).closest('.toggle-menu, .menu-dots').length && toggleMenu.hasClass('show') && (toggleMenu.removeClass('show'), e.removeClass('active'));
    });
}
var windowWidth = $(window).width(),
  headerHeight = $('#header').height(),
  sectionNav = $('.section-nav');
windowWidth < 992 &&
  $(window).on('scroll', function () {
    $(this).scrollTop() >= headerHeight ? sectionNav.addClass('fixed') : sectionNav.removeClass('fixed');
  });
var bgImages = document.querySelectorAll('.bg-image');
bgImages &&
  bgImages.forEach(function (e) {
    var t = e.getAttribute('data-bg-src');
    e.style.backgroundImage = 'url("' + t + '")';
  });
var swiper = new Swiper('.clients-swiper', {
  slidesPerView: 2,
  spaceBetween: 30,
  grabCursor: !0,
  breakpoints: { 768: { slidesPerView: 3, spaceBetween: 30 }, 992: { slidesPerView: 3, spaceBetween: 40 }, 1200: { slidesPerView: 5, spaceBetween: 40 } },
  autoplay: { delay: 2500, disableOnInteraction: !1 },
});
swiper = new Swiper('.testimonial-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: { 768: { slidesPerView: 1, spaceBetween: 30 }, 992: { slidesPerView: 1, spaceBetween: 40 }, 1200: { slidesPerView: 2, spaceBetween: 40 } },
  navigation: { nextEl: '.swiper-custom-next', prevEl: '.swiper-custom-prev' },
  autoplay: { delay: 2500, disableOnInteraction: !1 },
});
$('.counter').appear(
  function () {
    $(this).each(function () {
      $(this)
        .prop('Counter', 0)
        .animate(
          { Counter: $(this).text() },
          {
            duration: 2400,
            easing: 'swing',
            step: function (e) {
              $(this).text(Math.ceil(e));
            },
          }
        );
    });
  },
  { accX: 0, accY: -10 }
);
var pGrid = $('.portfolio-grid');
if (pGrid.length) var mixer = mixitup('.portfolio-grid', { selectors: { target: '.portfolio-item' }, animation: { duration: 250 } });
var $lightboxImage = $('.lightbox-image-box');
$lightboxImage.each(function () {
  $(this).magnificPopup({ type: 'image', fixedContentPos: !1, removalDelay: 200, closeOnContentClick: !0, image: { titleSrc: 'data-image-title' } });
});
var $lightboxMedia = $('.lightbox-media-box');
$lightboxMedia.each(function () {
  $(this).magnificPopup({
    type: 'iframe',
    fixedContentPos: !1,
    removalDelay: 200,
    preloader: !1,
    iframe: {
      patterns: { youtube: { index: 'youtube.com/', id: 'v=', src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0' }, vimeo: { index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1' } },
      srcAction: 'iframe_src',
    },
  });
}),
  $('#contactform').on('submit', function (e) {
    var t = $('#name').val(),
      a = $('#email').val(),
      o = $('#subject').val(),
      i = $('#message').val();
    '' === t && $('#name').addClass('error-color'),
      '' === a && $('#email').addClass('error-color'),
      '' === o && $('#subject').addClass('error-color'),
      '' === i
        ? $('#message').addClass('error-color')
        : ($.ajax({
            url: 'assets/php/contact-form.php',
            data: $(this).serialize(),
            type: 'POST',
            success: function (e) {
              $('#success').addClass('show-result'),
                $('#contactform').each(function () {
                  this.reset();
                });
            },
            error: function (e) {
              $('#error').addClass('show-result');
            },
          }),
          $('#contactform input, #contactform textarea').removeClass('error-color')),
      e.preventDefault();
  });
var mapCanvas = $('.gmap');
if (mapCanvas.length)
  for (var i = 0; i < mapCanvas.length; i++)
    (initLatitude = (m = mapCanvas[i]).dataset.latitude),
      (initLongitude = m.dataset.longitude),
      (divId = '#' + m.id),
      (map = new GMaps({ el: divId, lat: initLatitude, lng: initLongitude, zoom: 16, scrollwheel: !1, styles: [] })).addMarker({ lat: initLatitude, lng: initLongitude });
const scrollButton = document.querySelector('.scroll-circle'),
  content = document.getElementById('content');
scrollButton.addEventListener('click', () => {
  content.scrollIntoView({ behavior: 'smooth' });
}),
  window.addEventListener('scroll', () => {
    const e = window.scrollY;
    e > 0 ? scrollButton.classList.add('active') : scrollButton.classList.remove('active');
  });

function toggleDarkMode() {
  const isDarkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
  if (isDarkModeEnabled) {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.checked = false;
  }
}
darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
  toggleDarkMode();
});
toggleDarkMode();
