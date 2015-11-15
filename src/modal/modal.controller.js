(function () {
   'use strict';

   angular
      .module('iigame.modal')
      .controller('ModalCtrl', ModalCtrl);

   /** @ngInject */
   function ModalCtrl($modalInstance, data) {

      var vm = this;

      // fields
      vm.data = data;

      // methods
      vm.close = close;
      vm.ok = ok;
      vm.nok = nok;

      ////////////

      function close() {
         $modalInstance.close(false);
      }

      function ok() {
         $modalInstance.close(true);
      }

      function nok() {
         $modalInstance.close(false);
      }

   }

}());