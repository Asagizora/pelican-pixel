$(document).ready(function () {

  // Variables
  var $codeSnippets = $('.code-example-body'),
    $nav = $('.navbar'),
    $body = $('body'),
    $navTitle = $('.navbar-title').html(),
    $window = $(window),
    $popoverLink = $('[data-popover]'),
    navOffsetTop = $nav.offset().top,
    $document = $(document),
    didScroll,
    lastScrollTop = 0,
    delta = 5,
    navbarHeight = $('.mobile-nav').outerHeight(),
    entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    }

  function init() {
    $window.on('scroll', onScroll)
    $window.on('resize', resize)
    $popoverLink.on('click', openPopover)
    $document.on('click', closePopover)
    $('a[href^="#"]').on('click', smoothScroll)
    buildSnippets();
  }

  function smoothScroll(e) {
    e.preventDefault();
    $(document).off("scroll");
    var target = this.hash,
      menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - 40
    }, 0, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  }

  function openPopover(e) {
    e.preventDefault()
    closePopover();
    var popover = $($(this).data('popover'));
    popover.toggleClass('open')
    e.stopImmediatePropagation();
  }

  function closePopover(e) {
    if ($('.popover.open').length > 0) {
      $('.popover').removeClass('open')
    }
  }

  $("#button").click(function () {
    $('html, body').animate({
      scrollTop: $("#elementtoScrollToID").offset().top
    }, 2000);
  });

  function resize() {
    $body.removeClass('has-docked-nav')
    navOffsetTop = $nav.offset().top
    onScroll()
  }

  $('.navbar-title').hover(function () {
    $('.navbar-title').css('color', 'black');
  }, function () {
    $('.navbar-title').css('color', 'black');
  })

  $('#nav-icon').click(function () {
    $(this).toggleClass('open');
    $('.mobile-menu').toggle(200);
  });

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
      return;
    if (st > lastScrollTop && st > navbarHeight) {
      if ($('#nav-icon').hasClass('open')) {
        return;
      }
      $('.mobile-nav').css('top', '-30px')
    } else {
      if (st + $(window).height() < $(document).height()) {
        $('.mobile-nav').css('top', '40px')
      }
    }
    lastScrollTop = st;
  }

  function onScroll() {
    if (navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav')
      $('.navbar-title').fadeOut(200, function () {
        $(this).text($('.title').html()).fadeIn(200);
      });
      $('.navbar-title').click(function () {
        scrollTo(0, 0);
        return false;
      });
    }
    if (navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav')
      $('.navbar-title').fadeOut(200, function () {
        $(this).text($navTitle).fadeIn(200);
      })
      $('.navbar-title').unbind("click");
    }
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function buildSnippets() {
    $codeSnippets.each(function () {
      var newContent = escapeHtml($(this).html())
      $(this).html(newContent)
    })
  }


  init();

});