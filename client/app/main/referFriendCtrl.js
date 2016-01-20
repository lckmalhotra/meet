'use strict';

(function() {

  angular.module('meetApp')
    .controller('referFriendCtrl', function($scope, ngDialog, $http){
      var refer=this;
      refer.referingList= [{
        "name":'',
        "email":'',
        "isDirty":false
      }];

      refer.addMore = function (obj){
        obj = angular.copy(obj);
        obj.name="";
        obj.email="";
        obj.isDirty = false;
        refer.referingList.push(obj);
      }

      refer.removeMore = function (obj){
        if(refer.referingList.indexOf(obj)!=-1){
          var index = refer.referingList.indexOf(obj);
          refer.referingList.splice(index,1);
        }
      }

      refer.sendEmail = function(){
        var email ={"emails":[]};
        for (var i = 0; i < refer.referingList.length; i++) {
          if(refer.referingList[i].email){
            email.emails.push(refer.referingList[i].email)
          }
        }

         $http.post('/api/registrations/refer', email).then(function(response){
          console.log(response);
         },function(response){
          console.log(response);
         });
      }


    });


})();
