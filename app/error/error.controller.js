(function () {
   'use strict';

   angular
      .module('iigame.error')
      .controller('ErrorCtrl', ErrorCtrl);

   /** @ngAnotate */
   function ErrorCtrl(SessionService) {

      SessionService.setPageLoaded(true);

   }

})();
