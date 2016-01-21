/**
 * Created by Rumman on 1/13/2016.
 */

angular.module('meetApp')
    .controller('dashboardController', function ($scope, $http) {

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

    });

