/**
 * Created by Rumman on 1/13/2016.
 */

angular.module('meetApp')
    .controller('dashboardController', function ($scope, $http) {

<<<<<<< HEAD
$scope.fetch =  function () {
  $http.get("/api/things").then(function(res){
    $scope.items = res;
    console.log("thing",thing);
  },function(){});
};
$scope.fetch();
    $scope.deleteThing = function(thing) {
      console.log("deleted-thing",thing);
     $http.delete("/api/things/" + thing._id).then(function(res){
       $scope.fetch();
     });
    };

  });
=======
    });
>>>>>>> a4fbb531e3d73a51d02bdf0593ef11d781ecc16f

