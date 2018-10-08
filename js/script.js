(function ($) {
  console.log('© Theme-Vexo | https://github.com/yanm1ng/hexo-theme-vexo')
  var app = $('.app-body')
  var header = $('.header')
  var banner = document.getElementById('article-banner') || false
  var about = document.getElementById('about-banner') || false
  var top = $('.scroll-top')
  var catalog = $('.catalog-container .toc-main')
  var isOpen = false

  $(document).ready(function () {
    $('.menu-mask').css({
      '-webkit-transition': 'transform .2s ease',
      'transition': 'transform .2s ease',
      'top': '0',
      'left': '0',
      'right': '0',
      'bottom': '0',
      'height': '100%',
      'text-align': 'right',
      'width': '50%',
      'box-shadow': '1px 1px 15px #d9d9d9',
      'transform': 'translateX(-100%)',
    })
    $('.menu-mask-level').css({
      'max-width': '0',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'right': '0',
      'bottom': '0',
      'background-color': 'rgba(0,0,0,0.6)',
      'transition': 'all .1s ease',
      '-webkit-transition': 'all .1s ease'
    })
    NProgress.start()
    $('#nprogress .bar').css({
      'background': '#42b983'
    })
    $('#nprogress .spinner').hide()

    var fade = {
      transform: 'translateY(0)',
      opacity: 1
    }
    if (banner) {
      app.css('transition-delay', '0.15s')
      $('#article-banner').children().css(fade)
    }
    if (about) {
      $('.author').children().css(fade)
    }
    app.css(fade)
  })

  window.onload = function () {
    setTimeout(function () {
      NProgress.done()
    }, 200)
  }

  function bodyScroll(event){
    event.preventDefault();
  }
  $('.menu').on('click', function () {
    if (!header.hasClass('fixed-header') || isOpen) {
      header.toggleClass('fixed-header')
      isOpen = !isOpen
    }
    $('.menu-mask').toggleClass('open').css({transform: 'translateX(0)'})
    $('.menu-mask-level').toggleClass('open-mask').css('max-width','100%')
    $('body,html').css('overflow', 'hidden')
    document.body.addEventListener('touchmove',bodyScroll,false);
  })

  $('.menu-mask-level').on('click', function() {
    if($(this).hasClass('open-mask')) {
      $('.menu-mask').toggleClass('open').css({transform: 'translateX(-100%)'})
      $('.menu-mask-level').toggleClass('open-mask').css('max-width','0')
      $('body,html').css('overflow', '')
      document.body.removeEventListener('touchmove',bodyScroll,false);
    }
  })

  $('#tag-cloud a').on('click', function () {
    var list = $('.tag-list')
    var name = $(this).data('name')
    var maoH = list.find('#' + name).offset().top

    $('html,body').animate({
      scrollTop: maoH - header.height()
    }, 500)
  })

  $('.reward-btn').on('click', function () {
    $('.money-code').fadeToggle()
  })

  $('.arrow-down').on('click', function () {
    $('html, body').animate({
      scrollTop: banner.offsetHeight - header.height()
    }, 500)
  })

  $('.toc-nav a').on('click', function (e) {
    e.preventDefault()
    var catalogTarget = e.currentTarget
    var scrollTarget = $(catalogTarget.getAttribute('href'))
    var top = scrollTarget.offset().top
    if (top > 0) {
      $('html,body').animate({
        scrollTop: top - 65
      }, 500)
    }
  })

  top.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600)
  })

  document.addEventListener('scroll', function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var headerH = header.height()
    if (banner) {
      if (scrollTop > headerH) {
        header.addClass('fixed-header')
      } else if (scrollTop === 0) {
        header.removeClass('fixed-header')
      }
    }
    if (scrollTop > 100) {
      top.addClass('opacity')
    } else {
      top.removeClass('opacity')
    }
    if (scrollTop > 190) {
      catalog.addClass('fixed-toc')
    } else {
      catalog.removeClass('fixed-toc')
    }
  })
})(jQuery)
