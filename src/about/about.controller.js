(function () {
   'use strict';

   angular
      .module('iigame.about')
      .controller('AboutCtrl', AboutCtrl);

   /** @ngInject */
   function AboutCtrl(AuthService, MODULE) {

      AuthService.checkAccess(MODULE.ABOUT);

   }

})();
