(function () {
   'use strict';

   angular
      .module('iigame.error')
      .controller('ErrorCtrl', ErrorCtrl);

   /** @ngInject */
   function ErrorCtrl($location, SessionService, gettextCatalog) {

      SessionService.setPageLoaded(true);

      var vm = this;
      var url = $location.url().split('/');

      var errors = {
         404: {
            code: '404',
            name: gettextCatalog.getString('Not Found'),
            msg: gettextCatalog.getString('The requested page could not be found but may be available again in the future.')
         },
         403: {
            code: '403',
            name: gettextCatalog.getString('Forbidden'),
            msg: gettextCatalog.getString('The request was a legal request, but the server is refusing to respond to it.')
         }
      };

      vm.error = errors[url[url.length - 1]];

   }

})();
