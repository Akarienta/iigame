(function () {
   'use strict';

   angular
      .module('iigame.login')
      .controller('LoginCtrl', LoginCtrl);

   /** @ngAnotate */
   function LoginCtrl($scope, $cookies, AuthService, FirebaseService, AlertsService, inAuthData, gettextCatalog, MODULE) {

      var vm = this;
      var LOGIN_COOKIE = 'iigame.login';

      $scope.$on('userUpdated', function (event, authData) {
         if (!vm.users) {
            return;
         }

         vm.user = authData === null ? null : vm.users[authData.uid];
         changeTemplate(vm.user === null ? vm.templates.login : vm.templates.logout);
         __loadCookie();
         AuthService.checkAccess(authData, MODULE.USERS);
      });

      // template types
      vm.templates = {
         login: 0,
         resetPasswd: 1,
         resetPasswdDone: 2,
         logout: 3
      };

      // fields
      vm.loginForm = {};
      vm.resetForm = {};
      vm.loaded = false;
      vm.template = -1;
      vm.auth = {};
      vm.reset = {};
      vm.mail = '';

      // methods
      vm.isTemplateVisible = isTemplateVisible;
      vm.changeTemplate = changeTemplate;
      vm.hasAlerts = hasAlerts;
      vm.login = login;
      vm.logout = logout;
      vm.resetPasswd = resetPasswd;

      __init();

      ////////////

      function isTemplateVisible(template) {
         return template === vm.template;
      }

      function changeTemplate(template) {
         AlertsService.cleanAlerts();
         __clearLoginForm();
         __clearResetForm();
         vm.template = template;
      }

      function hasAlerts() {
         return AlertsService.getAlerts().length !== 0;
      }

      function login() {
         if (vm.loginForm.$invalid) {
            return;
         }

         vm.loaded = false;
         var login = vm.auth.login;
         var rememberLogin = vm.rememberLogin;

         FirebaseService.getAuth().$authWithPassword({
            email: angular.isDefined(vm.logins[vm.auth.login]) ? vm.logins[vm.auth.login].mail : '',
            password: vm.auth.password
         }).then(function()  {
            __clearLoginForm();
            $cookies.put(LOGIN_COOKIE, rememberLogin ? login : '');
         }).catch(function (error) {
            AlertsService.addAlert('alert', __getLoginErrorMessage(error));
         }).finally(function () {
            vm.loaded = true;
         });
      }

      function resetPasswd() {
         if (vm.resetForm.$invalid) {
            return;
         }

         vm.loaded = false;
         vm.mail = vm.reset.mail;

         FirebaseService.getAuth().$resetPassword({
            email: vm.reset.mail
         }).then(function() {
            __clearResetForm();
            changeTemplate(vm.templates.resetPasswdDone);
         }).catch(function(error) {
            console.log(error.code);
            AlertsService.addAlert('alert', __getResetErrorMessage(error));
         }).finally(function() {
            vm.loaded = true;
         });
      }

      function logout() {
         FirebaseService.getAuth().$unauth();
      }

      ////////////

      function __init() {
         AuthService.initController(inAuthData, MODULE.LOGIN)
            .then(__loadData)
            .finally(function () {
               vm.loaded = true;
               __loadCookie();
            });
      }

      function __loadData() {
         vm.users = FirebaseService.getUsers();
         vm.logins = FirebaseService.getLogins();
         vm.user = inAuthData === null ? null : vm.users[inAuthData.uid];
         changeTemplate(vm.user === null ? vm.templates.login : vm.templates.logout);
         return true;
      }

      function __clearLoginForm() {
         vm.auth.login = '';
         vm.auth.password = '';
         vm.rememberLogin = null;
      }

      function __clearResetForm() {
         vm.reset.mail = '';
      }

      function __loadCookie() {
         vm.auth.login = $cookies.get(LOGIN_COOKIE);
         vm.rememberLogin = (!vm.auth.login || vm.auth.login === '') ? null : true;
      }

      function __getLoginErrorMessage(error) {
         var msg = gettextCatalog.getString('Unable to log in user {{login}}.', {login: vm.auth.login});

         switch (error.code) {
            case 'INVALID_EMAIL':
               msg = gettextCatalog.getString('User {{login}} doesn\'t exist.', {login: vm.auth.login});
               __clearLoginForm();
               break;
            case 'INVALID_PASSWORD':
               msg = gettextCatalog.getString('Invalid password.');
               vm.auth.password = '';
               break;
         }

         return msg;
      }

      function __getResetErrorMessage(error) {
         var msg = gettextCatalog.getString('Unable to send password reset e-mail to {{mail}}.', {mail: vm.reset.mail});

         switch (error.code) {
            case 'INVALID_USER':
               msg = gettextCatalog.getString('E-mail {{mail}} doesn\'t exist.', {mail: vm.reset.mail});
               __clearResetForm();
               break;
         }

         return msg;
      }

   }

})();
