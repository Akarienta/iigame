(function () {
   'use strict';

   angular
      .module('iigame.about', [])
      .config(config);

   /** @ngInject */
   function config($stateProvider) {
      $stateProvider.state('about', {
         url: '/about',
         templateUrl: 'about.html',
         controller: 'AboutCtrl',
         controllerAs: 'vm'
      });
   }

})();
