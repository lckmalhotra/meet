'use strict';

(function() {

  angular.module('meetApp')
    .controller('MainController', function($scope, ngDialog, $http){
      $scope.registerNow = function () {

        ngDialog.open({
            templateUrl: '/app/main/form.html',
            controller: 'registerNow'
        });
      };

     var _that=this;
      _that.init=function(){
        if (jQuery(window).width() > 770) {
          jQuery(window).scroll(function () {
            var element = jQuery("#agenda");
            var offset = element.offset().top - 500;
            var currentScroll = jQuery(window).scrollTop();
            if (currentScroll > offset) {
              element.addClass("begin_animate");
              /*jQuery( "span.end").addClass("end_animate");
               jQuery( ".animate-left").addClass("left_side");*/
            }
            else if (currentScroll < offset) {
              element.removeClass("begin_animate");
              /*  jQuery( "span.begin").stop().animate({left:"40%"},800);
               jQuery( "span.end").stop().animate({right:"50%"},800)
               jQuery("ul.program_table").css("display","none");*/
              /*   jQuery( "span.end").removeClass("end_animate");*/
            }
          });
        }

        jQuery('.custom_wrapper').mouseenter(function(){

         jQuery('.custom_wrapper').first().removeClass('active');
        }).mouseleave(function(){
        });

       /* jQuery('.speakers_ul li').mouseenter(function(){

          jQuery(this).addClass('speaker-animation');
        }).mouseleave(function(){
          jQuery(this).removeClass('speaker-animation');
        });*/

          if (jQuery(window).width() > 770) {
            jQuery(window).scroll(function () {
              if (jQuery(this).scrollTop() > 154) {
                jQuery('.header-top').addClass('smaller');
              }

              else {
                jQuery('.header-top').removeClass('smaller');
              }
            });
          }


        jQuery(".header-top .logo img").click(function(){
          var target = $(".banner-area");
          jQuery('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);

          });
        jQuery(window).scroll(function () {
          if (jQuery(this).scrollTop() > 400) {
            jQuery('.scroll-top').show();
          }
          else  {
            jQuery('.scroll-top').hide();
          }
        });

        jQuery('.scroll-top').on("click",function(){
          var target = $(".banner-area");
          jQuery('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
        } );

        /*BOF mobile menu button*/
        jQuery("#mobile-menu-icon").click(function() {

          if(jQuery(this).next().is(":hidden")) {
            jQuery(".nav-bar").slideUp();
            jQuery(this).next().slideDown();
          }
          else {
            jQuery(".nav-bar").slideUp();
          }
          return false;
        });
        /*EOF mobile menu button*/

        /*BOF  Speaker section height*/
        if (jQuery(window).width() > 770) {
          jQuery(".speakers_ul li").each(function (index, value) {
            var height = 0;
            var maxHeight = jQuery(this).height();
            if (maxHeight > height) {
              height = maxHeight;
            }
            jQuery(".speakers_ul li").height(height);
          });
        }
        /* EOF Speaker section height*/
        jQuery(function(){
          jQuery.scrollIt({
            upKey: 38,             // key code to navigate to the next section
            downKey: 40,           // key code to navigate to the previous section
            easing: 'linear',      // the easing function for animation
            scrollTime: 600,       // how long (in ms) the animation takes
            activeClass: 'active', // class given to the active nav element
            onPageChange: null,    // function(pageIndex) that is called when page is changed
            topOffset: -61  // offste (in px) for fixed top navigation
          });
        });

      }
    });

})();
