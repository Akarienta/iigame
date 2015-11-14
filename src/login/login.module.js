(function () {
   'use strict';

   angular
      .module('iigame.login', [])
      .config(config);

   /** @ngInject */
   function config($stateProvider) {
      $stateProvider.state('login', {
         url: '/login',
         templateUrl: 'login.html',
         controller: 'LoginCtrl',
         controllerAs: 'vm'
      });
   }

})();
