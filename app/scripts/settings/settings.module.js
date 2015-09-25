(function () {
   'use strict';

   angular
      .module('iigame.settings', [
         'ui.router',
         'iigame.constants'
      ])
      .config(config);

   /** @ngAnotate */
   function config($stateProvider, ROLE) {
      $stateProvider.state('settings', {
         url: '/settings',
         templateUrl: 'settings.html',
         controller: 'SettingsCtrl',
         controllerAs: 'vm',
         roles: ROLE.getAll()
      });
   }

})();
