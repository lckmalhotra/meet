'use strict';

angular.module('meetApp', ['meetApp.auth', 'meetApp.admin', 'meetApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngDialog', 'ngAnimate']).config(function ($urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
