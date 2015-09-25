(function () {
   'use strict';

   angular
      .module('iigame.services')
      .service('ConfigService', ConfigService);

   /** @ngAnotate */
   function ConfigService($http) {

      var CONFIG_FILE = 'config.json';
      var service = {
         getLanguage: getLanguage,
         getFireBaseAppName: getFireBaseAppName
      };

      return service;

      ////////////

      function getLanguage() {
         return __getParam('language');
      }

      function getFireBaseAppName() {
         return __getParam('firebaseAppName');
      }

      ////////////

      function __getParam(paramName) {
         return $http.get(CONFIG_FILE).then(function (response) {
            return response.data[paramName];
         });
      }

   }

})();
