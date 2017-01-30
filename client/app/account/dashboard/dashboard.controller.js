/**
 * Created by Rumman on 1/13/2016.
 */

angular.module('meetApp')
    .controller('dashboardController', function ($scope, $http) {

      $scope.Dec2015 = '2015-12-31T22:00:00.000Z';
      $scope.Feb2016 = '2016-02-30T22:00:00.000Z';
      $scope.Jan2017 = '2017-01-30T22:00:00.000Z';
      $scope.Mar2017 = '2017-03-01T22:00:00.000Z';

        $scope.fetch = function () {
            $http.get("/api/registrations").then(function (res) {
                $scope.items = res;
            }, function () {
            });
        };
    $scope.expression=false;
        $scope.fetch();

        $scope.sendTicket = function (user, idx) {
            $http.post("/api/registrations/sendTicket", user)
                .then(function (res) {
                    $scope.items.data[idx].ticketSent = true;
                }, function () {

                });
        };

        $scope.deleteThing = function (thing) {
            $http.delete("/api/registrations/" + thing._id).then(function (res) {
                $scope.fetch();
            });
        };


      $scope.tab = 1;

      $scope.setTab = function(newTab){
        $scope.tab = newTab;
      };

      $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
      };



    });

