/**
 * Created by ttnd on 12/1/16.
 */
'use strict';

(function() {

  angular.module('meetApp')
    .controller('registerNow', function($scope, ngDialog, $http){

      $scope.formData = {};
      $scope.isActive=true;

      $scope.addThing = function() {
        if ($scope.formData) {
         $http.post('/api/things', $scope.formData);
          $scope.formData = {};
          $scope.isActive=false;
         }
      };
$scope.closeThisDialog=function(){
  ngDialog.close();
}

    });

})();
