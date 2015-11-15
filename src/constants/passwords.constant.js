(function () {
   'use strict';

   angular
      .module('iigame.constants')
      .constant('PASSWORD_TYPE', {
         FAKE: 'fake',
         REAL: 'real',

         getAll: function() {
            return [this.FAKE, this.REAL];
         }

      });

})();
