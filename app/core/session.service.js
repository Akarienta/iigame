(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('SessionService', SessionService);

   /** @ngAnotate */
   function SessionService($q) {

      var menuPromise = $q.defer();
      var firebasePromise = $q.defer();

      var service = {
         resolveMenu: resolveMenu,
         getMenuPromise: getMenuPromise,
         resolveFirebase: resolveFirebase,
         getFirebasePromise: getFirebasePromise
      };

      return service;

      ////////////

      function resolveMenu() {
         menuPromise.resolve();
      }

      function getMenuPromise() {
         return menuPromise.promise;
      }

      function resolveFirebase() {
         firebasePromise.resolve();
      }

      function getFirebasePromise() {
         return firebasePromise.promise;
      }

   }

})();
