(function (angular, undefined) {
    'use strict';

    angular.module('meetApp.constants', [])
        .constant('appConfig', {userRoles: ['guest', 'user', 'admin']});

})(angular);