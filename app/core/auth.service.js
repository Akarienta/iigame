(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('AuthService', AuthService);

   /** @ngAnotate */
   function AuthService($state, FirebaseService, SessionService, MODULE, ROLE) {

      var ACCESS_RIGHTS = {};
      ACCESS_RIGHTS[MODULE.CHECK] = [];
      ACCESS_RIGHTS[MODULE.PASSWORDS] = [ROLE.SUB];
      ACCESS_RIGHTS[MODULE.LOGIN] = [];
      ACCESS_RIGHTS[MODULE.USERS] = [ROLE.SUB];
      ACCESS_RIGHTS[MODULE.SETTINGS] = ROLE.getAll();
      ACCESS_RIGHTS[MODULE.ABOUT] = [];

      var service = {
         getModuleAccesRights: getModuleAccessRights,
         checkAccess: checkAccess,
         initController: initController
      };

      return service;

      ////////////

      function getModuleAccessRights(module) {
         return ACCESS_RIGHTS[module];
      }

      function checkAccess(authData, module) {
         if (ACCESS_RIGHTS[module].length === 0) {
            return true;
         }

         SessionService.getFirebasePromise().then(function () {
            if (authData === null || ACCESS_RIGHTS[module].indexOf(FirebaseService.getUsers()[authData.uid].role) === -1) {
               throw $state.go('403');
            } else {
               return true;
            }
         });
      }

      function initController(authData, module) {
         return SessionService.getMenuPromise()
            .then(SessionService.getFirebasePromise)
            .then(checkAccess(authData, module));
      }

   }

})();
