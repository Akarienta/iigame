(function () {
   'use strict';

   angular
      .module('iigame.services')
      .service('SessionService', SessionService);

   /** @ngAnotate */
   function SessionService($q, $firebaseAuth, $firebaseObject, ConfigService) {

      var refPromise = __getRef();
      var service = {
         getRootRef: getRootRef,
         getAuth: getAuth,
         getUsers: getUsers,
         getLogins: getLogins
      };

      return service;

      ////////////

      function getRootRef() {
         return refPromise;
      }

      function getAuth() {
         return refPromise.then(function(ref) {
            return $firebaseAuth(ref);
         });
      }

      function getUsers() {
         return __getFirebaseObject('users');
      }

      function getLogins() {
         return __getFirebaseObject('logins');
      }

      ////////////

      function __getRef() {
         var ref = $q.defer();
         ConfigService.getFireBaseAppName().then(function (fireBaseAppName) {
            ref.resolve(new Firebase('https://' + fireBaseAppName + '.firebaseio.com'));
         });
         return ref.promise;
      }

      function __getFirebaseObject(path) {
         return refPromise.then(function(ref) {
            return $firebaseObject(ref.child(path));
         });
      }

   }

})();
