(function () {
   'use strict';

   angular
      .module('iigame.core')
      .controller('CoreCtrl', CoreCtrl);

   /** @ngAnotate */
   function CoreCtrl(SessionService) {
      var vm = this;

      vm.loaded = false;

      __init();

      ////////////

      function __init() {
         SessionService.getMenuPromise().then(function () {
            vm.loaded = true;
         });
      }

   }

}());