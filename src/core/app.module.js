(function () {
   'use strict';

   angular
      .module('iigame', [
         'ui.router',
         'mm.foundation',
         'gettext',
         'firebase',
         'ngMessages',
         'ngPassword',
         'ngCookies',
         'hljs',
         'angular-md5',
         'iigame.modal',
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

   /** @ngInject */
   function config($urlRouterProvider, $logProvider) {
      $urlRouterProvider
         .when('', '/home')
         .otherwise('/error/404');

      $logProvider.debugEnabled(false);
   }

   /** @ngInject */
   function run($log, $rootScope, ConfigService, AlertsService, SessionService, gettextCatalog) {
      ConfigService.getLanguage().then(function (lang) {
         gettextCatalog.setCurrentLanguage(lang);
      });

      $rootScope.$on('$stateChangeStart', function () {
         $log.debug('AppModule.run() - State chnaged.');
         SessionService.setPageLoaded(false);
         AlertsService.cleanAlerts();
      });
   }

})();
