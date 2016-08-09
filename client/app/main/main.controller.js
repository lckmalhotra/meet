'use strict';

(function() {

  angular.module('meetApp')
    .controller('MainController', function($scope, ngDialog, $http){
      $scope.registerNow = function () {

        ngDialog.open({
            templateUrl: 'app/main/form.html',
            controller: 'registerNow',
            className: 'ngdialog-theme-default register-form'
        });
      };

      $scope.submitTalk = function () {

        ngDialog.open({
          templateUrl: 'app/main/talkForm.html',
          controller: 'talkForm',
          className: 'ngdialog-theme-default talk-form'
        });
      };

     var _that=this;
      _that.init=function(){
      }
    });

})();
