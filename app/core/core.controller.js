(function () {
   'use strict';

   angular
      .module('iigame.core')
      .controller('CoreCtrl', CoreCtrl);

   /** @ngAnotate */
   function CoreCtrl($rootScope, SessionService, FirebaseService) {

      var vm = this;

      vm.loaded = false;

      __init();

      ////////////

      function __init() {
         SessionService.getMenuPromise()
            .then(SessionService.getFirebasePromise)
            .then(function () {
               vm.loaded = true;

               FirebaseService.getAuth().$onAuth(function (authData) {
                  $rootScope.$broadcast('userUpdated', authData);
               });
            });
      }

   }

}());