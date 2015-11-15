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

      ////////////

      function close() {
         $modalInstance.close();
      }

   }

}());