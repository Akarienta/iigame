(function () {
   'use strict';

   angular
      .module('iigame.check')
      .controller('CheckCtrl', CheckCtrl);

   /** @ngInject */
   function CheckCtrl(AuthService, MODULE) {

      AuthService.checkAccess(MODULE.CHECK);

   }

})();
