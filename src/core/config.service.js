(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('ConfigService', ConfigService);

   /** @ngInject */
   function ConfigService($http) {

      var CONFIG_FILE = 'firebase.json';
      var service = {
         getLanguage: getLanguage,
         getFireBaseAppName: getFireBaseAppName,
         getAlertsHistory: getAlertsHistory,
         getFile: getFile
      };

      return service;

      ////////////

      function getLanguage() {
         return __getParam('language');
      }

      function getFireBaseAppName() {
         return __getParam('firebase');
      }

      function getAlertsHistory() {
         return __getParam('alertsHistory');
      }

      function getFile() {
         return $http.get(CONFIG_FILE).then(function (response) {
            return response.data;
         });
      }

      ////////////

      function __getParam(paramName) {
         return $http.get(CONFIG_FILE).then(function (response) {
            return response.data[paramName];
         });
      }

   }

})();
