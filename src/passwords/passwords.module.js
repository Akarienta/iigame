(function () {
   'use strict';

   angular
      .module('iigame.passwords', [])
      .config(config);

   /** @ngInject */
   function config($stateProvider) {
      $stateProvider.state('passwords', {
         url: '/passwords',
         templateUrl: 'passwords.html',
         controller: 'PasswordsCtrl',
         controllerAs: 'vm'
      });
   }

})();
