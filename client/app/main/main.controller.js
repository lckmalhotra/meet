'use strict';

(function () {

    angular.module('meetApp')
        .controller('MainController', function ($scope, ngDialog, $http) {
            $scope.registerNow = function () {
                ngDialog.open({
                    template: 'templateId',
                    controller: 'registerNow'
                });

            };

            var _that = this;
            _that.init = function () {
                jQuery(window).scroll(function () {
                    var element = jQuery("#agenda");
                    var offset = element.offset().top - 500;
                    var currentScroll = jQuery(window).scrollTop();
                    if (currentScroll > offset) {

                        jQuery("span.begin").stop().animate({left: 0}, 800);
                        jQuery("span.end").stop().animate({right: "60px"}, 800).promise().done(function () {
                            jQuery("ul.program_table").stop().fadeIn(500);
                        });
                    }
                    else if (currentScroll < offset) {

                        jQuery("span.begin").stop().animate({left: "40%"}, 800);
                        jQuery("span.end").stop().animate({right: "50%"}, 800)
                        jQuery("ul.program_table").css("display", "none");
                    }
                });


                jQuery('.program_table li').mouseenter(function () {
                    jQuery('.program_table li').removeClass('active');

                    jQuery(this).find('.time_detail').show();
                }).mouseleave(function () {

                    jQuery(this).find('.time_detail').hide();
                });
                jQuery(window).scroll(function () {
                    if ($(this).scrollTop() > 490) {
                        jQuery('.header-top').addClass('smaller');
                    }
                    else {
                        jQuery('.header-top').removeClass('smaller');
                    }
                });

                jQuery(function () {
                    jQuery.scrollIt({
                        upKey: 38,             // key code to navigate to the next section
                        downKey: 40,           // key code to navigate to the previous section
                        easing: 'linear',      // the easing function for animation
                        scrollTime: 600,       // how long (in ms) the animation takes
                        activeClass: 'active', // class given to the active nav element
                        onPageChange: null,    // function(pageIndex) that is called when page is changed
                        topOffset: -61           // offste (in px) for fixed top navigation
                    });
                });

            }
        });

})();
