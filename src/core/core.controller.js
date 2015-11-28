(function () {
   'use strict';

   angular
      .module('iigame.core')
      .controller('CoreCtrl', CoreCtrl);

   /** @ngInject */
   function CoreCtrl($q, FirebaseService, SecurityRulesService, AlertsService, SessionService) {

      var vm = this;

      var appLoaded = false;

      vm.isAppLoaded = isAppLoaded;
      vm.isPageLoaded = SessionService.isPageLoaded;

      __init();

      ////////////

      function isAppLoaded() {
         return appLoaded;
      }

      ////////////

      function __init() {
         $q.all([
            AlertsService.getLoadedPromise(),
            FirebaseService.getLoadedPromise(),
            SecurityRulesService.getLoadedPromise()
         ]).then(function () {
            appLoaded = true;
         });
      }

   }

}());