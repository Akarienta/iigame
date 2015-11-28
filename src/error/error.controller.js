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
            /// error 404 title
            name: gettextCatalog.getString('Not Found'),
            msg: gettextCatalog.getString('The page you requested cannot be found. Please try again later.')
         },
         403: {
            code: '403',
            /// error 403 title
            name: gettextCatalog.getString('Forbidden'),
            msg: gettextCatalog.getString('You don\'t have permission to access this folder/file on this server.')
         }
      };

      vm.error = errors[url[url.length - 1]];

   }

})();
