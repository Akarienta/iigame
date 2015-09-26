(function () {
   'use strict';

   angular
      .module('iigame.menu')
      .controller('MenuCtrl', MenuCtrl);

   /** @ngAnotate */
   function MenuCtrl($scope, SessionService, AuthService, FirebaseService, MODULE) {

      $scope.$on('userUpdated', function (event, authData) {
         if (!users) {
            return;
         }

         user = authData === null ? null : users[authData.uid];
      });

      var vm = this;
      var users = {};
      var user = null;

      vm.isHomeVisible = isHomeVisible;
      vm.isPasswordsVisible = isPasswordsVisible;
      vm.isLoginVisible = isLoginVisible;
      vm.isLogoutVisible = isLogoutVisible;
      vm.isSettingsVisible = isSettingsVisible;
      vm.isUsersVisible = isUsersVisible;
      vm.isAboutVisible = isAboutVisible;

      __init();

      ////////////

      function isHomeVisible() {
         return __isItemVisible(MODULE.CHECK);
      }

      function isPasswordsVisible() {
         return __isItemVisible(MODULE.PASSWORDS);
      }

      function isLoginVisible() {
         return __isItemVisible(MODULE.LOGIN) && user === null;
      }

      function isLogoutVisible() {
         return __isItemVisible(MODULE.LOGIN) && user !== null;
      }
      function isSettingsVisible() {
         return __isItemVisible(MODULE.SETTINGS);
      }

      function isUsersVisible() {
         return __isItemVisible(MODULE.USERS);
      }

      function isAboutVisible() {
         return __isItemVisible(MODULE.ABOUT);
      }

      ////////////

      function __init() {
         SessionService.getFirebasePromise()
            .then(__loadData)
            .then(__loadUser)
            .then(function() {
               SessionService.resolveMenu();
            });
      }

      function __loadData() {
         users = FirebaseService.getUsers();
         return true;
      }

      function __loadUser() {
         return FirebaseService.getWaitForAuthPromise().then(function (authData) {
            user = authData === null ? null : users[authData.uid];
         })
      }

      function __isItemVisible(module) {
         var rights = AuthService.getModuleAccessRights(module);

         if (rights.length === 0) {
            return true;
         }

         if (user === null) {
            return false;
         }

         return rights.indexOf(user.role) !== -1;
      }

   }

})();
