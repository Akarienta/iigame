(function () {
   'use strict';

   angular
      .module('iigame.core')
      .controller('CoreCtrl', CoreCtrl);

   /** @ngAnotate */
   function CoreCtrl(FirebaseService, SessionService) {

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
         FirebaseService.getLoadedPromise().then(function () {
            appLoaded = true;
         });
      }

   }

}());