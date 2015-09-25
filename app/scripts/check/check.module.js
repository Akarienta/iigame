(function () {
   'use strict';

   angular
      .module('iigame.check', [
         'ui.router'
      ])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider) {
      $stateProvider.state('check', {
         url: '/check',
         templateUrl: 'check.html',
         controller: 'CheckCtrl',
         controllerAs: 'vm'
      });
   }

})();
