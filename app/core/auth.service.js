(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('AuthService', AuthService);

   /** @ngAnotate */
   function AuthService($rootScope, $state, FirebaseService, SessionService, MODULE, ROLE) {

      var authData = FirebaseService.getAuth().$getAuth();
      FirebaseService.getAuth().$onAuth(function (newAuthData) {
         authData = newAuthData;

         if (activeModule) {
            checkAccess(activeModule);
         }

         $rootScope.$emit('userUpdated');
      });

      var ACCESS_RIGHTS = {};
      ACCESS_RIGHTS[MODULE.CHECK] = [];
      ACCESS_RIGHTS[MODULE.PASSWORDS] = ROLE.getAll();
      ACCESS_RIGHTS[MODULE.LOGIN] = [];
      ACCESS_RIGHTS[MODULE.USERS] = FirebaseService.areUsersDisabled() ? ROLE.getAll() : [];
      ACCESS_RIGHTS[MODULE.SETTINGS] = ROLE.getAll();
      ACCESS_RIGHTS[MODULE.ABOUT] = [];

      var activeModule = null;

      var service = {
         getUser: getUser,
         canAccess: canAccess,
         checkAccess: checkAccess
      };

      return service;

      ////////////

      function getUser() {
         return authData === null ? null : FirebaseService.getUsers()[authData.uid];
      }

      function canAccess(module) {
         if (ACCESS_RIGHTS[module].length === 0) {
            return true;
         }

         return authData !== null && ACCESS_RIGHTS[module].indexOf(getUser().role) !== -1;
      }

      function checkAccess(module) {
         activeModule = module;

         if (!canAccess(module)) {
            throw $state.go('403');
         } else {
            SessionService.setPageLoaded(true);
         }
      }

   }

})();
