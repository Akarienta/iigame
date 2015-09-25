(function () {
   'use strict';

   angular
      .module('iigame', [
         'ui.router',
         'mm.foundation',
         'gettext',
         'firebase',
         'ngMessages',
         'iigame.constants',
         'iigame.alerts',
         'iigame.services',
         'iigame.menu',
         'iigame.check',
         'iigame.login',
         'iigame.passwords',
         'iigame.users',
         'iigame.settings',
         'iigame.about'
      ])
      .config(config)
      .run(run);

   /** @ngAnotate */
   function config($urlRouterProvider) {
      $urlRouterProvider
         .when('', '/check')
         .otherwise('/404');
   }

   /** @ngAnotate */
   function run($rootScope, ConfigService, AlertsService, gettextCatalog) {
      ConfigService.getLanguage().then(function (lang) {
         gettextCatalog.setCurrentLanguage(lang);
      });

      $rootScope.$on('$stateChangeStart', function () {
         AlertsService.cleanAlerts();
      });
   }

})();
