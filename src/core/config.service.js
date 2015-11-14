(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('ConfigService', ConfigService);

   /** @ngInject */
   function ConfigService($http) {

      var CONFIG_FILE = 'config.json';
      var service = {
         getLanguage: getLanguage,
         getFireBaseAppName: getFireBaseAppName,
         getFile: getFile
      };

      return service;

      ////////////

      function getLanguage() {
         return __getParam('language');
      }

      function getFireBaseAppName() {
         return __getParam('firebaseAppName');
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
