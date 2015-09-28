(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('FirebaseService', FirebaseService);

   /** @ngAnotate */
   function FirebaseService($q, $firebaseAuth, $firebaseObject, ConfigService) {

      var loadedPromise = $q.defer();
      var data = {
         areUsersDisabled: false
      };

      var service = {
         getLoadedPromise: getLoadedPromise,
         getAuth: getAuth,
         getUsers: getUsers,
         getLogins: getLogins,
         getSecurityUrl: getSecurityUrl,
         areUsersDisabled: areUsersDisabled
      };

      __init();

      return service;

      ////////////

      function getLoadedPromise() {
         return loadedPromise.promise;
      }

      function getAuth() {
         return data.auth;
      }

      function getUsers() {
         return data.users;
      }

      function getLogins() {
         return data.logins;
      }

      function areUsersDisabled() {
         return data.areUsersDisabled;
      }

      function getSecurityUrl() {
         return data.fireBaseUrl + '/?page=Security';
      }

      ////////////

      function __getRef() {
         return ConfigService.getFireBaseAppName().then(function (fireBaseAppName) {
            data.fireBaseUrl = 'https://' + fireBaseAppName + '.firebaseio.com';
            return new Firebase(data.fireBaseUrl);
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
               return $firebaseAuth(ref).$waitForAuth().then(function() {
                  return data.auth = $firebaseAuth(ref);
               });
            })
         ]);
      }

      function __areDataLoaded() {
         return $q.all([
            data.users.$loaded(),
            data.logins.$loaded()
         ])
      }

      function __postLoadData() {
         return $q.all([
            data.users.$save().catch(function () {
               data.areUsersDisabled = true;
            })
         ]);
      }

      function __init() {
         __loadData()
            .then(__areDataLoaded)
            .then(__postLoadData)
            .then(function () {
               loadedPromise.resolve();
            });
      }

   }

})();
