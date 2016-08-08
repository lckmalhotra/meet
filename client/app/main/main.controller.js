'use strict';

(function() {

  angular.module('meetApp')
    .controller('MainController', function($scope, ngDialog, $http){
      $scope.registerNow = function () {

        ngDialog.open({
            templateUrl: 'app/main/form.html',
            controller: 'registerNow'
        });
      };

      $scope.submitTalk = function () {

        ngDialog.open({
          templateUrl: 'app/main/talkForm.html',
          controller: 'talkForm'
        });
      };

     var _that=this;
      _that.init=function(){


      }
    });

})();
