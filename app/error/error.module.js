(function () {
   'use strict';

   angular
      .module('iigame.error', [])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider) {
      $stateProvider
         .state('403', {
            url: '/403',
            templateUrl: 'error.html',
            controller: 'ErrorCtrl',
            controllerAs: 'vm'
         })
         .state('404', {
            url: '/404',
            templateUrl: 'error.html',
            controller: 'ErrorCtrl',
            controllerAs: 'vm'
         });
   }

})();
