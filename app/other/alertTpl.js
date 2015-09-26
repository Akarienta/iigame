(function () {
   'use strict';

   angular
      .module('template/alert/alert.html', [])
      .run(run);

   function run($templateCache) {
      $templateCache.put('template/alert/alert.html',
         '<div class="alert-box" ng-class="(type || \'\')">\n' +
         '  <span ng-transclude></span>\n' +
         '  <a ng-show="closeable" class="close" ng-click="close()"><span class="fi-x"></span></a>\n' +
         '</div>\n' +
         '');
   }

})();