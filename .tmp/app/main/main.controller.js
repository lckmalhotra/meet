'use strict';

(function () {

  angular.module('meetApp').controller('MainController', function ($scope, ngDialog, $http) {
    $scope.registerNow = function () {
      ngDialog.open({
        template: 'templateId',
        controller: 'registerNow'
      });
    };

    $scope.addThing = function () {
      alert('haha');
      /*if (this.newThing) {
        this.$http.post('/api/things', { name: this.newThing });
        this.newThing = '';
      }*/
    };
  });
})();
//# sourceMappingURL=main.controller.js.map
