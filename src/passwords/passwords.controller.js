(function () {
   'use strict';

   angular
      .module('iigame.passwords')
      .controller('PasswordsCtrl', PasswordsCtrl);

   /** @ngAnotate */
   function PasswordsCtrl(AuthService, MODULE) {

      AuthService.checkAccess(MODULE.PASSWORDS);

   }

})();
