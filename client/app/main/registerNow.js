/**
 * Created by ttnd on 12/1/16.
 */
'use strict';

(function () {

    angular.module('meetApp')
        .controller('registerNow', function ($scope, ngDialog, $http) {

            $scope.formData = {};
            $scope.isActive = true;


            $scope.addThing = function () {
              if($scope.userForm.$valid) {
                if ($scope.formData) {
                  $http.post('/api/registrations', $scope.formData);
                  $scope.formData = {};
                  $scope.isActive = false;
                }
              }
            };
            $scope.closeThisDialog = function () {
                ngDialog.close();
            };

            setTimeout(function(){
                if (!String.prototype.trim) {
                    (function() {
                        // Make sure we trim BOM and NBSP
                        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                        String.prototype.trim = function() {
                            return this.replace(rtrim, '');
                        };
                    })();
                }

                [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
                    // in case the input is already filled..
                    if( inputEl.value.trim() !== '' ) {
                        classie.add( inputEl.parentNode, 'input--filled' );
                    }

                    // events:
                    inputEl.addEventListener( 'focus', onInputFocus );
                    inputEl.addEventListener( 'blur', onInputBlur );
                } );

                function onInputFocus( ev ) {
                    classie.add( ev.target.parentNode, 'input--filled' );
                }

                function onInputBlur( ev ) {
                    if( ev.target.value.trim() === '' ) {
                        classie.remove( ev.target.parentNode, 'input--filled' );
                    }
                }
            },10)






        });
})();
