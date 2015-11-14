(function () {
   'use strict';

   angular
      .module('iigame.constants')
      .constant('ROLE', {
         DOM: 'dom',
         SUB: 'sub',

         getAll: function() {
            return [this.DOM, this.SUB];
         }

   });

})();
