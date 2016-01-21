/**
 * Created by ttnd on 12/1/16.
 */
'use strict';

(function () {

  angular.module('meetApp')
    .controller('registerNow', ['$scope', 'ngDialog', '$http', 'vcRecaptchaService', function ($scope, ngDialog, $http, vcRecaptchaService) {
      $scope.formData = {};
      $scope.isActive = true;

      $scope.public = "6Lf8ARYTAAAAAIlSY94hkgsSDGVqyarCLQkVvyOS";

      $scope.addThing = function () {
        if ($scope.formData) {
          if (vcRecaptchaService.getResponse() === "") { //if string is empty
            alert("Please resolve the captcha and submit!")
          } else {
            var formData = {  //prepare payload for request
              'name': $scope.formData.name,
              'company': $scope.formData.company,
              'email': $scope.formData.email,
              'phone': $scope.formData.phone,
              'g-recaptcha-response': vcRecaptchaService.getResponse()  //send g-captcah-reponse to our server
            };
          }
          $http.post('/api/registrations', $scope.formData).success(function(response){
            if(response.error === 0){
              alert("Successfully verified and signed up the user");
            }else{
              alert("User verification failed");
            }
          })
            .error(function(error){

            });
          //$http.post('/api/registrations', $scope.formData);
          //$scope.formData = {};
          //$scope.isActive = false;
        }
      };
      $scope.closeThisDialog = function () {
        ngDialog.close();
      }
    }]);
})();
