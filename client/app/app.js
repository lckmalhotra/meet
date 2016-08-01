'use strict';

/*
$('input.form-control').click(function() {
  if ($.trim($(this).val()) == '') {
    $(this).prev().addClass('effect');
  }
});
jQuery('input.form-control').blur(function() {
  if (jQuery.trim(jQuery(this).val()) == '') {
    console.log("onfocus")
    jQuery(this).prev().removeClass('effect');
  } else {
    jQuery(this).prev().addClass('effect');
  }
})
*/

angular.module('meetApp', [
  'meetApp.auth',
  'meetApp.admin',
  'meetApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngDialog',
  'ngAnimate'
])
  .config(function($urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
  }).filter('dateFilter', function () {

    return function (items, fromDate, toDate) {
      var filtered = [];

      for (var i = 0; i < items.length; i++) {

        var item = items[i];
        if (item.date > fromDate && item.date < toDate){
          filtered.push(item);
        }
      }

      return filtered;
    };
  });

