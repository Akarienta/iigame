(function () {
   'use strict';

   angular
      .module('iigame.passwords', [
         'ui.router',
         'iigame.constants'
      ])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider) {
      $stateProvider.state('passwords', {
         url: '/passwords',
         templateUrl: 'passwords.html',
         controller: 'PasswordsCtrl',
         controllerAs: 'vm'
      });
   }

})();
