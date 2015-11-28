(function () {
   'use strict';

   angular
      .module('iigame.alerts')
      .service('AlertsService', AlertsService);

   /** @ngInject */
   function AlertsService($q, $log, ConfigService) {
      var loadedPromise = $q.defer();
      var alerts = [];
      var clearOnStateChange = true;
      var alertsHistory;

      var service = {
         getLoadedPromise: getLoadedPromise,
         addAlert: addAlert,
         removeAlert: removeAlert,
         getAlerts: getAlerts,
         cleanAlerts: cleanAlerts,
         notClearOnStateChange: notClearOnStateChange
      };

      __init();

      return service;

      ////////////

      function getLoadedPromise() {
         return loadedPromise.promise;
      }

      function addAlert(type, msg) {
         if (!alertsHistory) {
            alerts = [];
         }
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
            $log.debug('AlertsService.cleanAlerts() - Clearing alerts on state change is ENABLED.');
            alerts = [];
         } else {
            $log.debug('AlertsService.cleanAlerts() - Clearing alerts on state change is DISABLED.');
            clearOnStateChange = true;
         }
      }

      function notClearOnStateChange() {
         clearOnStateChange = false;
      }

      ////////////

      function __init() {
         ConfigService.getAlertsHistory()
            .then(function (data) {
               alertsHistory = data;
               loadedPromise.resolve();
            });
      }

   }

}());