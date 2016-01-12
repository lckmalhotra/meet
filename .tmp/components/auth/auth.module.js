'use strict';

angular.module('meetApp.auth', ['meetApp.constants', 'meetApp.util', 'ngCookies', 'ui.router']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
