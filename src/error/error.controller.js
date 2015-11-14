(function () {
   'use strict';

   angular
      .module('iigame.error')
      .controller('ErrorCtrl', ErrorCtrl);

   /** @ngInject */
   function ErrorCtrl(SessionService) {

      SessionService.setPageLoaded(true);

   }

})();
