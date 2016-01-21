'use strict';

angular.module('meetApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
    .state('refer', {
      url: '/referafriend',
      templateUrl: 'app/main/refer.html',
      controller: 'referFriendCtrl',
      controllerAs: 'refer'
    });
  });
