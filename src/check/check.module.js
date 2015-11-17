(function () {
   'use strict';

   angular
      .module('iigame.check', [])
      .config(config);

   /** @ngInject */
   function config($stateProvider) {
      $stateProvider.state('check', {
         url: '/home',
         templateUrl: 'check.html',
         controller: 'CheckCtrl',
         controllerAs: 'vm'
      });
   }

})();
