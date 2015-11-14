(function () {
   'use strict';

   /** @namespace iigame */
   angular
      .module('iigame', [
         'ui.router',
         'mm.foundation',
         'gettext',
         'firebase',
         'ngMessages',
         'ngPassword',
         'ngCookies',
         'iigame.error',
         'iigame.constants',
         'iigame.alerts',
         'iigame.core',
         'iigame.filters',
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
   function run($rootScope, ConfigService, AlertsService, SessionService, gettextCatalog) {
      ConfigService.getLanguage().then(function (lang) {
         gettextCatalog.setCurrentLanguage(lang);
      });

      $rootScope.$on('$stateChangeStart', function () {
         SessionService.setPageLoaded(false);
         AlertsService.cleanAlerts();
      });
   }

})();
