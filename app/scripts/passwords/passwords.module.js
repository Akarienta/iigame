(function () {
   'use strict';

   angular
      .module('iigame.passwords', [
         'ui.router',
         'iigame.constants'
      ])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider, ROLE) {
      $stateProvider.state('passwords', {
         url: '/passwords',
         templateUrl: 'passwords.html',
         controller: 'PasswordsCtrl',
         controllerAs: 'vm',
         roles: [ROLE.SUB]
      });
   }

})();
