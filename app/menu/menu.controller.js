(function () {
   'use strict';

   angular
      .module('iigame.menu')
      .controller('MenuCtrl', MenuCtrl);

   /** @ngAnotate */
   function MenuCtrl(SessionService) {
      // private fields
      var vm = this;

      // TODO
      SessionService.resolveMenu();
   }

})();
