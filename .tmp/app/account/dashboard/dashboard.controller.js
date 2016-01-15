/**
 * Created by Rumman on 1/13/2016.
 */

'use strict';

angular.module('meetApp').controller('dashboardController', function ($scope, $http) {

  $scope.fetch = function () {
    $http.get("/api/registrations").then(function (res) {
      $scope.items = res;
    }, function () {});
  };
  $scope.fetch();
  $scope.deleteThing = function (thing) {
    $http['delete']("/api/registrations/" + thing._id).then(function (res) {
      $scope.fetch();
    });
  };
});
//# sourceMappingURL=dashboard.controller.js.map
