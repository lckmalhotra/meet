/**
 * Created by Rumman on 1/13/2016.
 */

'use strict';

angular.module('meetApp').controller('dashboardController', function ($scope, $http) {

  $scope.fetch = function () {
    $http.get("/api/things").then(function (res) {
      $scope.items = res;
      console.log("thing", thing);
    }, function () {});
  };
  $scope.fetch();
  $scope.deleteThing = function (thing) {
    console.log("deleted-thing", thing);
    $http['delete']("/api/things/" + thing._id).then(function (res) {
      $scope.fetch();
    });
  };
});
//# sourceMappingURL=dashboard.controller.js.map
