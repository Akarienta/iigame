(function () {
   'use strict';

   angular
      .module('iigame.users', [])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider) {
      $stateProvider.state('users', {
         url: '/users',
         templateUrl: 'users.html',
         controller: 'UsersCtrl',
         controllerAs: 'vm'
      });
   }

})();
