(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('SecurityRulesService', SecurityRulesService);

   /** @ngInject */
   function SecurityRulesService($q, $http) {

      var ALLOWED_FILE = '.security_allowed.json';
      var DISABLED_FILE = '.security_disabled.json';

      var loadedPromise = $q.defer();
      var data = {};

      var service = {
         getLoadedPromise: getLoadedPromise,
         getAllowedRules: getAllowedRules,
         getDisabledRules: getDisabledRules
      };

      __init();

      return service;

      ////////////

      function getLoadedPromise() {
         return loadedPromise.promise;
      }

      function getAllowedRules() {
         return data.allowed;
      }

      function getDisabledRules() {
         return data.disabled;
      }

      ////////////

      function __loadData() {
         return $q.all([
            $http.get(ALLOWED_FILE).then(function (response) {
               data.allowed = response.data;
            }),
            $http.get(DISABLED_FILE).then(function (response) {
               data.disabled = response.data;
            })
         ]);
      }

      function __init() {
         __loadData()
            .then(function () {
               loadedPromise.resolve();
            });
      }

   }

})();
