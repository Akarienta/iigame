(function () {
   'use strict';

   angular
      .module('iigame.login', [])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider) {
      $stateProvider.state('login', {
         url: '/login',
         templateUrl: 'login.html',
         controller: 'LoginCtrl',
         controllerAs: 'vm'
      });
   }

})();
