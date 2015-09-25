(function () {
   'use strict';

   angular
      .module('iigame.about', [
         'ui.router'
      ])
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
