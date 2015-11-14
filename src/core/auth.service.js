(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('AuthService', AuthService);

   /** @ngAnotate */
   function AuthService($rootScope, $state, FirebaseService, SessionService, MODULE, ROLE) {

      var user = __loadUser(FirebaseService.getAuth().$getAuth());

      FirebaseService.getAuth().$onAuth(function (authData) {
         user = __loadUser(authData);

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

      ////////////

      function __loadUser(authData) {
         var user = authData === null ? null : FirebaseService.getUsers()[authData.uid];
         if (user) {
            user.uid = authData.uid;
            user.mail = FirebaseService.getLogins()[user.login].mail;
         }
         return user;
      }

   }

})();
