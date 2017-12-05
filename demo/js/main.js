$(function(){
  // PreLoad
  setTimeout(function removepreload(){
    $('#preload').hide();
    $('.container').css({'visibility':'visible'});
  }, 3000);

  // Go To
  // $('a[href^="#"]').click(function() {
  //   $('html,body').animate({
  //     scrollTop: $(this.hash).offset().top
  //   }, 1000);
  //   return false;
  // });

  // RESPONSIVE STUFF
  function responsive(){
    window.responsive;
    $(window).on('resize', function(){
      clearTimeout(window.responsive);
      window.responsive = setTimeout(function(){
        mobile();
      }, 0);
    });
  }

  menumobile = $('<div id="menu-button" class="menu-mobile"><a href="#">Menu</a></div>');
  menumobileClone = menumobile.clone(true);
  menumobile.remove();

  var w = $(window).width();
  function mobile(){
    if(w <= 800) {
      // General Mobile Devices
      /* menu mobile */
      if($('#menu-button').length == 0){
        $('header .col:nth-of-type(2)').prepend(menumobileClone);
      }
      mobileMenu();
      /* end menu mobile */
      // turn on autoplay anggota on mobile
      if($('#home').length){
        anggota.autoplay.start();
        anggota.update();
        mitra.autoplay.start();
        mitra.update();
        inisiator.autoplay.start();
        inisiator.update();
      } else {
        // detailContainer.params.freeMode = true;
      }
    } else {
      // Desktop Begin
      /* menu desktop */
      if($('#menu-button').length){
        resetmobileMenu();
      }

      $('.menu li').hover(function(){
        $(this).find('.sub').stop().slideDown(200);
      }, function(){
        $(this).find('.sub').stop().slideUp(200);
      });
    }
  }

  mobile();
  $(window).on('load resize', responsive);
  /* end of responsive stuff */

  function resetmobileMenu(){
    $('.menu').removeClass('menu-collapsed menu-expanded');
    menubutton.removeClass('close');
    $('#menu-button').detach();
  }

  function mobileMenu(){
    menubutton = $('.menu-mobile');
    menu = $('.menu');

    if($('.menu-mobile a').filter(function() {
        return $.trim($.text(this)) === 'Close';
      }).length){
      $('.menu-mobile a').html('Menu');
    }

    function menumobileexpand(){
      if(menu.hasClass('menu-expanded')){
        menubutton.removeClass('close');
        removemenumobile();
      } else {
        menubutton.addClass('close');
        menu.addClass('menu-expanded').removeClass('menu-collapsed');
      }

      if($('.close').length){
        $('.menu-mobile a').html('Close');
      } else {
        $('.menu-mobile a').html('Menu');
      }
    }

    function removemenumobile(){
      if($('.menu-collapsed').length){
        menu.removeClass('menu-collapsed');
      } else {
        menu.removeClass('menu-expanded').addClass('menu-collapsed').delay(1000).queue(function(){
          $('.sub').css({'display':'none'});
        });
      }
    }

    removemenumobile();

    /* buka menu */
    $('.menu-mobile').on('click', function(e){
      e.preventDefault();
      e.stopImmediatePropagation();

      menumobileexpand();
      
      /* tutup menu */
      $(document).on('click', function(e){
        // e.preventDefault();
        e.stopImmediatePropagation();
        if(e.target.className != 'menu-mobile'){
          removemenumobile();

          menubutton.removeClass('close');
          $('.menu-mobile a').html('Menu');
          menu.removeClass('menu-expanded').addClass('menu-collapsed').delay(1000).queue(function(){
            $('.sub').css({'display':'none'});
          });
        }
      });
    });

    /* klik link menunya */
    $('.menu a').off('click').on('click', function(e){
      e.stopImmediatePropagation();
      return true;
    });

    /* expand collapse sub menu */
    $('.has-sub').off('click').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var submenu = $(this).find('.sub');
      $('.sub').not(submenu).css({'display':'none'});
      submenu.css({'display':'block'});
    });
  }
});

var header = $('header');
if($('#home').length){
  var homeContainer = new Swiper('#home', {
    direction: 'vertical',
    mousewheel: true,
    hashNavigation: {
      replaceState: true,
      watchState: true
    },
    init: false
  });
  
  homeContainer.on('init, slideChange', function(){
    if(homeContainer.activeIndex > 0){
      header.addClass('active');
    } else {
      header.removeClass('active');
    }
  });
  
  if($('.swiper-slide-active.latest').length){
    console.log('swiper ke berapa nih');
  } else {
    console.log('hide');
  }
  
  homeContainer.init();
  
  var headline = new Swiper('.headline', {
    direction: 'horizontal'
  });
  
  var anggota = new Swiper('.anggota', {
    slidesPerView: 5,
    slidesPerColumn: 2,
    spaceBetween: 10,
    breakpoints: {
      800: {
        slidesPerView: 1
      },
      375: {
        slidesPerView: 1,
        slidesPerColumn: 1
      }
    }
  });
  
  var mitra = new Swiper('.mitra', {
    slidesPerView: 5,
    breakpoints: {
      800:  {
        slidesPerView: 1
      }
    }
  });

  var inisiator = new Swiper('.swiper-container.inisiator', {
    slidesPerView: 3,
    spaceBetween: 0,
    breakpoints: {
      600:  {
        slidesPerView: 1
      }
    }
  });
} else {
  var detailContainer = new Swiper('#detail', {
    direction: 'vertical',
    mousewheel: true,
    hashNavigation: {
      replaceState: true,
      watchState: true
    },
    init: false
  });
  
  detailContainer.on('init, slideChange', function(){
    if(detailContainer.activeIndex > 0){
      header.addClass('active');
    } else {
      header.removeClass('active');
    }
  });

  detailContainer.init();
}

