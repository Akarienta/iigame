(function () {
   'use strict';

   angular
      .module('iigame.check')
      .controller('CheckCtrl', CheckCtrl);

   /** @ngAnotate */
   function CheckCtrl(AuthService, MODULE) {

      AuthService.checkAccess(MODULE.CHECK);

   }

})();
