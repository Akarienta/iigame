(function () {
   'use strict';

   angular
      .module('iigame.check')
      .controller('CheckCtrl', CheckCtrl);

   /** @ngInject */
   function CheckCtrl($timeout, $cookies, AuthService, AlertsService, FirebaseService, SessionService, md5, gettextCatalog, MODULE) {

      AuthService.checkAccess(MODULE.CHECK);

      var vm = this;
      var CHECK_LOGIN_COOKIE = 'iigame.check_login';

      // template types
      vm.templates = {
         login: 0,
         result: 1
      };

      // fields
      vm.success = false;
      vm.passwordText = '';
      vm.check = {};

      // methods
      vm.isTemplateVisible = isTemplateVisible;
      vm.changeTemplate = changeTemplate;
      vm.checkPassword = checkPassword;
      vm.hasAlerts = hasAlerts;

      changeTemplate(vm.templates.login, true);

      ////////////

      function isTemplateVisible(template) {
         return template === vm.template;
      }

      function changeTemplate(template, init) {
         AlertsService.cleanAlerts();
         __clear();
         __loadCookie();
         vm.template = template;

         if (!init) {
            __fakeLoadPage();
         }
      }

      function checkPassword() {
         if (vm.checkForm.$invalid) {
            return;
         }

         if (!FirebaseService.getLogins().hasOwnProperty(vm.check.login)) {
            AlertsService.addAlert('alert', gettextCatalog.getString('Employer {{user}} doesn\'t exists.', {user: vm.check.login}));
            __clearLogin();
            __fakeLoadPage();
            return;
         }

         $cookies.put(CHECK_LOGIN_COOKIE, vm.rememberCheckLogin ? vm.check.login : '');

         var passwords = FirebaseService.getEncryptedPasswords();
         var encryptedPassword = md5.createHash(vm.check.password);

         if (!passwords.hasOwnProperty(encryptedPassword)) {
            AlertsService.addAlert('alert', gettextCatalog.getString('Password {{password}} doesn\'t exist.', {password: vm.check.password}));
            __fakeLoadPage();
            return;
         }

         vm.success = passwords[encryptedPassword].type === 'real';
         vm.passwordText = passwords[encryptedPassword].text;

         changeTemplate(vm.templates.result);
      }

      function hasAlerts() {
         return AlertsService.getAlerts().length !== 0;
      }

      ////////////

      function __loadCookie() {
         vm.check.login = $cookies.get(CHECK_LOGIN_COOKIE);
         vm.rememberCheckLogin = (!vm.check.login || vm.check.login === '') ? null : true;
      }

      function __clear() {
         vm.check = {};

         if (angular.isDefined(vm.checkForm)) {
            vm.checkForm.$setPristine();
         }
      }

      function __clearLogin() {
         vm.rememberCheckLogin = null;
         $cookies.put(CHECK_LOGIN_COOKIE, '');
      }

      function __fakeLoadPage() {
         SessionService.setPageLoaded(false);

         $timeout(function () {
            SessionService.setPageLoaded(true);
         }, 500);
      }

   }

})();
