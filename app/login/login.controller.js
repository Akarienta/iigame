(function () {
   'use strict';

   angular
      .module('iigame.login')
      .controller('LoginCtrl', LoginCtrl);

   /** @ngAnotate */
   function LoginCtrl() {

      var vm = this;

      vm.loaded = true;
      vm.template = 0;

      vm.isTemplateVisible  = isTemplateVisible;
      vm.changeTemplate = changeTemplate;

      ////////////

      function isTemplateVisible(num) {
         return num === vm.template;
      }

      function changeTemplate(num) {
         vm.template = num;
      }

      ////////////

   }

})();
