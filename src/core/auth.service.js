(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('AuthService', AuthService);

   /** @ngInject */
   function AuthService($rootScope, $state, FirebaseService, SessionService, MODULE, ROLE) {

      var user = null;
      var savedAuthData = FirebaseService.getAuth().$getAuth();
      __loadUser(savedAuthData);

      FirebaseService.getAuth().$onAuth(function (authData) {
         if (authData === savedAuthData) {
            return;
         }

         savedAuthData = authData;
         FirebaseService.reloadData();

         FirebaseService.getLoadedPromise().then(function () {
            __loadUser(authData);

            if (activeModule) {
               checkAccess(activeModule);
            }

            $rootScope.$emit('userUpdated');
         });
      });

      var ACCESS_RIGHTS = {};
      ACCESS_RIGHTS[MODULE.CHECK] = [];
      ACCESS_RIGHTS[MODULE.PASSWORDS] = [ROLE.SUB];
      ACCESS_RIGHTS[MODULE.LOGIN] = [];
      ACCESS_RIGHTS[MODULE.USERS] = FirebaseService.areUsersDisabled() ? ROLE.getAll() : [];
      ACCESS_RIGHTS[MODULE.SETTINGS] = ROLE.getAll();
      ACCESS_RIGHTS[MODULE.ABOUT] = [];

      var activeModule = null;

      var service = {
         getUser: getUser,
         canAccess: canAccess,
         checkAccess: checkAccess,
         setMail: setMail
      };

      return service;

      ////////////

      function getUser() {
         return user;
      }

      function canAccess(module) {
         if (ACCESS_RIGHTS[module].length === 0) {
            return true;
         }

         return user !== null && ACCESS_RIGHTS[module].indexOf(user.role) !== -1;
      }

      function checkAccess(module) {
         activeModule = module;

         if (!canAccess(module)) {
            throw $state.go('403');
         } else {
            SessionService.setPageLoaded(true);
         }
      }

      function setMail(newMail) {
         user.mail = newMail;
      }

      ////////////

      function __loadUser(authData) {
         var userData = authData === null ? null : FirebaseService.getUsers()[authData.uid];
         if (userData) {
            userData.uid = authData.uid;
            userData.mail = FirebaseService.getLogins()[userData.login].mail;
         }

         user = userData;
      }

   }

})();
