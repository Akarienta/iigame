(function () {
   'use strict';

   angular
      .module('iigame.alerts')
      .service('AlertsService', AlertsService);

   /** @ngAnotate */
   function AlertsService() {
      var alerts = [];
      var service = {
         addAlert: addAlert,
         removeAlert: removeAlert,
         getAlerts: getAlerts,
         cleanAlerts: cleanAlerts
      };

      return service;

      ////////////

      function addAlert(type, msg) {
         alerts.push({
            type: type + ' radius',
            msg: msg
         });
      }

      function removeAlert(index) {
         alerts.splice(index, 1);
      }

      function getAlerts() {
         return alerts;
      }

      function cleanAlerts() {
         alerts = [];
      }

   }

}());