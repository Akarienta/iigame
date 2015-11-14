(function () {
   'use strict';

   angular
      .module('iigame.about', [])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider) {
      $stateProvider.state('about', {
         url: '/about',
         templateUrl: 'about.html',
         controller: 'AboutCtrl',
         controllerAs: 'vm'
      });
   }

})();
