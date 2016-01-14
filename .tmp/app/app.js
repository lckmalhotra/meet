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

angular.module('meetApp', ['meetApp.auth', 'meetApp.admin', 'meetApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngDialog', 'ngAnimate']).config(function ($urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
