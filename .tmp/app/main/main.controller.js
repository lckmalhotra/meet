'use strict';

(function () {

  angular.module('meetApp').controller('MainController', function ($scope, ngDialog, $http) {
    $scope.registerNow = function () {
      ngDialog.open({
        template: 'templateId',
        controller: 'registerNow'
      });
    };

    $scope.fetch = function () {
      $http.get("/api/things").then(function (res) {
        $scope.items = res;
      }, function () {});
    };
    $scope.fetch();
    var _that = this;
    _that.init = function () {
      jQuery(window).scroll(function () {
        var element = jQuery("#agenda");
        var offset = element.offset().top - 300;
        var currentScroll = jQuery(window).scrollTop();
        if (currentScroll > offset) {

          jQuery("span.begin").stop().animate({ left: 0 }, 800);
          jQuery("span.end").stop().animate({ right: "60px" }, 800).promise().done(function () {
            jQuery("ul.program_table").stop().fadeIn(500);
          });
        } else if (currentScroll < offset) {

          jQuery("span.begin").stop().animate({ left: "40%" }, 800);
          jQuery("span.end").stop().animate({ right: "45%" }, 800);
          jQuery("ul.program_table").css("display", "none");
        }
      });

      jQuery('.program_table li').mouseenter(function () {
        jQuery('.program_table li').removeClass('active');

        jQuery(this).find('.time_detail').stop().slideDown(1000);
      }).mouseleave(function () {

        jQuery(this).find('.time_detail').stop().slideUp(1000);
      });
    };
  });
})();
//# sourceMappingURL=main.controller.js.map
