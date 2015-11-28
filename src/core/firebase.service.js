(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('FirebaseService', FirebaseService);

   /** @ngInject */
   function FirebaseService($q, $log, $firebaseAuth, $firebaseObject, ConfigService) {

      var loadedPromise = $q.defer();
      var data = {
         areUsersDisabled: false
      };

      var service = {
         getLoadedPromise: getLoadedPromise,
         getAuth: getAuth,
         getUsers: getUsers,
         getLogins: getLogins,
         getEncryptedPasswords: getEncryptedPasswords,
         getDecryptedPasswords: getDecryptedPasswords,
         getSecurityUrl: getSecurityUrl,
         areUsersDisabled: areUsersDisabled,
         reloadData: reloadData
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

      function getEncryptedPasswords() {
         return data.encryptedPasswords;
      }

      function getDecryptedPasswords() {
         return data.decryptedPasswords;
      }

      function areUsersDisabled() {
         return data.areUsersDisabled;
      }

      function getSecurityUrl() {
         return data.fireBaseUrl + '/?page=Security';
      }

      function reloadData() {
         data = {
            areUsersDisabled: false
         };
         loadedPromise = $q.defer();

         __init();
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
            var deffered = $q.defer();
            ref.child(path).on('value', function () {
               deffered.resolve($firebaseObject(ref.child(path)));
            }, function () {
               $log.debug('FirebaseService.getFirebaseObject() - The read on path "' + path + '" failed.');
               deffered.resolve(null);
            });
            return deffered.promise;
         });
      }

      function __loadAuth() {
         return __getRef().then(function (ref) {
            return $firebaseAuth(ref).$waitForAuth().then(function () {
               return data.auth = $firebaseAuth(ref);
            });
         })
      }

      function __loadData() {
         return $q.all([
            __getFirebaseObject('accounts/logins').then(function (logins) {
               data.logins = logins;
            }),
            __getFirebaseObject('accounts/users').then(function (users) {
               data.users = users;
            }),
            __getFirebaseObject('passwords/encrypted').then(function (passwords) {
               data.encryptedPasswords = passwords;
            }),
            __getFirebaseObject('passwords/decrypted').then(function (passwords) {
               data.decryptedPasswords = passwords;
            })
         ]);
      }

      function __areDataLoaded() {
         return $q.all([
            data.users && data.users.$loaded(),
            data.logins && data.logins.$loaded(),
            data.encryptedPasswords && data.encryptedPasswords.$loaded(),
            data.decryptedPasswords && data.decryptedPasswords.$loaded()
         ])
      }

      function __postLoadData() {
         return $q.all([
            __disableUsers()
         ]);
      }

      function __disableUsers() {
         if (!data.users) {
            data.areUsersDisabled = true;
            return true;
         }

         return data.users.$save().catch(function () {
            data.areUsersDisabled = true;
         });
      }

      function __init() {
         __loadAuth()
            .then(__loadData)
            .then(__areDataLoaded)
            .then(__postLoadData)
            .then(function () {
               loadedPromise.resolve();
            });
      }

   }

})();
