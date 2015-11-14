(function () {
   'use strict';

   angular
      .module('iigame.passwords')
      .controller('PasswordsCtrl', PasswordsCtrl);

   /** @ngInject */
   function PasswordsCtrl(AuthService, MODULE) {

      AuthService.checkAccess(MODULE.PASSWORDS);

   }

})();
