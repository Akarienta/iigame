(function () {
   'use strict';

   angular
      .module('iigame.settings')
      .controller('SettingsCtrl', SettingsCtrl);

   /** @ngAnotate */
   function SettingsCtrl(AuthService, MODULE) {

      AuthService.checkAccess(MODULE.SETTINGS);
      
   }

})();
