(function () {
   'use strict';

   angular
      .module('iigame.settings', [
         'ui.router',
         'iigame.constants'
      ])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider) {
      $stateProvider.state('settings', {
         url: '/settings',
         templateUrl: 'settings.html',
         controller: 'SettingsCtrl',
         controllerAs: 'vm'
      });
   }

})();
