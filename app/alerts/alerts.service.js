(function () {
   'use strict';

   angular
      .module('iigame.alerts')
      .service('AlertsService', AlertsService);

   /** @ngAnotate */
   function AlertsService() {
      var alerts = [];
      var clearOnStateChange = true;

      var service = {
         addAlert: addAlert,
         removeAlert: removeAlert,
         getAlerts: getAlerts,
         cleanAlerts: cleanAlerts,
         notClearOnStateChange: notClearOnStateChange
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
         if (clearOnStateChange) {
            alerts = [];
         } else {
            clearOnStateChange = true;
         }
      }

      function notClearOnStateChange() {
         clearOnStateChange = false;
      }

   }

}());