(function () {
   'use strict';

   angular
      .module('iigame.menu')
      .controller('MenuCtrl', MenuCtrl);

   /** @ngAnotate */
   function MenuCtrl() {
      // private fields
      var vm = this;

      // methods
      vm.logout = logout;

      ////////////

      function logout() {
         // TODO
      }
   }

})();
