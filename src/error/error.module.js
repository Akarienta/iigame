(function () {
   'use strict';

   angular
      .module('iigame.error', [])
      .config(config);

   /** @ngInject */
   function config($stateProvider) {
      $stateProvider
         .state('403', {
            url: '/error/403',
            templateUrl: 'error.html',
            controller: 'ErrorCtrl',
            controllerAs: 'vm'
         })
         .state('404', {
            url: '/error/404',
            templateUrl: 'error.html',
            controller: 'ErrorCtrl',
            controllerAs: 'vm'
         });
   }

})();
