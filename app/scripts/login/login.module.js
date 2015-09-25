(function () {
   'use strict';

   angular
      .module('iigame.login', [
         'ui.router',
         'iigame.constants',
         'ngPassword'
      ])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider, ROLE) {
      $stateProvider.state('login', {
         url: '/login',
         templateUrl: 'login.html',
         controller: 'LoginCtrl',
         controllerAs: 'vm',
         roles: ROLE.getAll()
      });
   }

})();
