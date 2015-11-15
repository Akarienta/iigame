(function () {
   'use strict';

   angular
      .module('iigame.modal')
      .service('ModalService', ModalService);

   /** @ngInject */
   function ModalService($modal) {

      var service = {
         openPasswordDetailModal: openPasswordDetailModal,
         openConfirmDeletionModal: openConfirmDeletionModal
      };

      return service;

      ////////////

      function openPasswordDetailModal(data) {
         $modal.open({
            templateUrl: 'modal.password.html',
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

      function openConfirmDeletionModal(data) {
         return $modal.open({
            templateUrl: 'modal.delete.html',
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
