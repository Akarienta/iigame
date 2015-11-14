(function () {
   'use strict';

   angular
      .module('iigame.users', [])
      .config(config);

   /** @ngInject */
   function config($stateProvider) {
      $stateProvider.state('users', {
         url: '/users',
         templateUrl: 'users.html',
         controller: 'UsersCtrl',
         controllerAs: 'vm'
      });
   }

})();
