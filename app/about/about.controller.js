(function () {
   'use strict';

   angular
      .module('iigame.about')
      .controller('AboutCtrl', AboutCtrl);

   /** @ngAnotate */
   function AboutCtrl(AuthService, MODULE) {

      AuthService.checkAccess(MODULE.ABOUT);

   }

})();
