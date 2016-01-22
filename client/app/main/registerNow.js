/**
 * Created by ttnd on 12/1/16.
 */
'use strict';

(function () {

    angular.module('meetApp')
        .controller('registerNow', function ($scope, ngDialog, $http) {

            $scope.formData = {};
            $scope.isActive = true;


            $scope.addThing = function () {
              if($scope.userForm.$valid) {
                console.log("run");
                if ($scope.formData) {
                  $http.post('/api/registrations', $scope.formData);
                  $scope.formData = {};
                  $scope.isActive = false;
                }
              }
            };
            $scope.closeThisDialog = function () {
                ngDialog.close();
            }
        });
})();
