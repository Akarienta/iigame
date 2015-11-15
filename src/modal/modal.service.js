(function () {
   'use strict';

   angular
      .module('iigame.modal')
      .service('ModalService', ModalService);

   /** @ngInject */
   function ModalService($modal) {

      var service = {
         openPasswordDetailModal: openPasswordDetailModal
      };

      return service;

      ////////////

      function openPasswordDetailModal(data) {
         $modal.open({
            templateUrl: 'modal.html',
            controller: 'ModalCtrl',
            controllerAs: 'modalVm',
            backdrop: 'static',
            resolve: {
               data: function () {
                  return data;
               }
            }
         });
      }

   }

})();
