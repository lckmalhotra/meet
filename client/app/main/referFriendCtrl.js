'use strict';

(function() {

  angular.module('meetApp')
    .controller('referFriendCtrl', function($scope, ngDialog, $http){
      var refer=this;
      refer.googleContactList = [];
      refer.selectAll = false;
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

      var gmailFactory = function(data,token){
        this.imageUrl = data.link[0].href + '?access_token=' + token.access_token;
        this.email = data.gd$email[0].address;
        this.name = data.title.$t;
        this.isSelected = false;
      }


      var fetch = function (token) {
        $.ajax({
          url: "https://www.google.com/m8/feeds/contacts/default/full?access_token=" + token.access_token + "&alt=json",
          dataType: "jsonp",
          success:function(data) {
            console.log(data)
            for (var i = 0; i < data.feed.entry.length; i++) {
              refer.googleContactList.push(new gmailFactory(data.feed.entry[i],token));
            }
            $scope.$digest();
          }
        });


      }


      refer.auth = function() {
        var config = {
          'client_id': '353240185538-6pe7fmks74sfl1md3i8ha74ugror60hp.apps.googleusercontent.com',
          'scope': 'https://www.google.com/m8/feeds'
        };
        gapi.auth.authorize(config, function() {
          fetch(gapi.auth.getToken());
        });
      }

      refer.selectAllReferFriend = function(){
        if(!refer.selectAll){
          for (var i = 0; i < refer.googleContactList.length; i++) {
            refer.googleContactList[i].isSelected =true;
          }
        }
        else{
          for (var i = 0; i < refer.googleContactList.length; i++) {
            refer.googleContactList[i].isSelected =false;
          }
        }
        refer.selectAll = !refer.selectAll;

      }

      refer.sendGoogleEmail = function(){
        var email ={"emails":[]};
        for (var i = 0; i < refer.googleContactList.length; i++) {
          if(refer.googleContactList[i].isSelected){
            email.emails.push(refer.googleContactList[i].email)
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
