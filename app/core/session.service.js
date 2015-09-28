(function () {
   'use strict';

   angular
      .module('iigame.core')
      .service('SessionService', SessionService);

   /** @ngAnotate */
   function SessionService() {

      var pageLoaded = false;

      var service = {
         isPageLoaded: isPageLoaded,
         setPageLoaded: setPageLoaded
      };

      return service;

      ////////////

      function isPageLoaded() {
         return pageLoaded;
      }

      function setPageLoaded(value) {
         pageLoaded = value;
      }

   }

})();
