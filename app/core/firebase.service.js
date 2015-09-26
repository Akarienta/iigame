(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('FirebaseService', FirebaseService);

   /** @ngAnotate */
   function FirebaseService($q, $firebaseAuth, $firebaseObject, ConfigService, SessionService) {

      var data = {};

      var service = {
         getAuth: getAuth,
         getUsers: getUsers,
         getLogins: getLogins,
         getWaitForAuthPromise: getWaitForAuthPromise,
         getSecurityUrlPromise: getSecurityUrlPromise
      };

      __init();

      return service;

      ////////////

      function getAuth() {
         return data.auth;
      }

      function getUsers() {
         return data.users;
      }

      function getLogins() {
         return data.logins;
      }

      function getWaitForAuthPromise() {
         return __getRef().then(function (ref) {
            return $firebaseAuth(ref).$waitForAuth();
         });
      }

      function getSecurityUrlPromise() {
         return __getRefUrl().then(function (refUrl) {
            return refUrl + '/?page=Security';
         });
      }

      ////////////

      function __getRefUrl() {
         return ConfigService.getFireBaseAppName().then(function (fireBaseAppName) {
            return 'https://' + fireBaseAppName + '.firebaseio.com';
         });
      }

      function __getRef() {
         return __getRefUrl().then(function (refUrl) {
            return new Firebase(refUrl);
         });

      }

      function __getFirebaseObject(path) {
         return __getRef().then(function (ref) {
            return $firebaseObject(ref.child(path));
         });
      }

      function __loadData() {
         return $q.all([
            __getFirebaseObject('accounts/logins').then(function (logins) {
               data.logins = logins;
            }),
            __getFirebaseObject('accounts/users').then(function (users) {
               data.users = users;
            }),
            __getRef().then(function (ref) {
               data.auth = $firebaseAuth(ref);
            })
         ]);
      }

      function __areDataLoaded() {
         return $q.all([
            data.users.$loaded(),
            data.logins.$loaded()
         ])
      }

      function __init() {
         __loadData()
            .then(__areDataLoaded)
            .then(function () {
               SessionService.resolveFirebase();
            });
      }

   }

})();
