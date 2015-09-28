(function () {
   'use strict';

   angular
      .module('iigame.menu')
      .controller('MenuCtrl', MenuCtrl);

   /** @ngAnotate */
   function MenuCtrl($rootScope, AuthService, MODULE) {

      var vm = this;

      $rootScope.$on('userUpdated', function () {
         load();
      });

      load();

      ////////////

      function load() {
         vm.isHomeVisible = AuthService.canAccess(MODULE.CHECK);
         vm.isPasswordsVisible = AuthService.canAccess(MODULE.PASSWORDS);
         vm.isLoginVisible = AuthService.canAccess(MODULE.LOGIN) && !AuthService.getUser();
         vm.isLogoutVisible = AuthService.canAccess(MODULE.LOGIN) && AuthService.getUser();
         vm.isSettingsVisible = AuthService.canAccess(MODULE.SETTINGS);
         vm.isUsersVisible = AuthService.canAccess(MODULE.USERS);
         vm.isAboutVisible = AuthService.canAccess(MODULE.ABOUT);   
      }

   }

})();
