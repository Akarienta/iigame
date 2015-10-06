(function () {
   'use strict';

   angular
      .module('iigame.settings')
      .controller('SettingsCtrl', SettingsCtrl);

   /** @ngAnotate */
   function SettingsCtrl($q, $state, AuthService, SessionService, FirebaseService, AlertsService, gettextCatalog, MODULE) {

      AuthService.checkAccess(MODULE.SETTINGS);

      var vm = this;

      // fields
      vm.mail = {};
      vm.password = {};
      vm.delete = {};
      vm.isDeletionActive = false;

      // methods
      vm.setDeletionActive = setDeletionActive;
      vm.clearChangeMailForm = clearChangeMailForm;
      vm.clearChangePasswdForm = clearChangePasswdForm;
      vm.closeDeletion = closeDeletion;
      vm.changeMail = changeMail;
      vm.changePassword = changePassword;
      vm.deleteAccount = deleteAccount;

      ////////////

      function setDeletionActive(value) {
         vm.isDeletionActive = value;
      }

      function clearChangeMailForm() {
         vm.mail.password = '';
         vm.mail.new = '';

         vm.changeMailForm.$setPristine();
      }

      function clearChangePasswdForm() {
         vm.password.old = '';
         vm.password.new = '';
         vm.password.confirm = '';

         vm.changePasswdForm.$setPristine();
      }

      function closeDeletion() {
         __clearDeleteUserForm();
         setDeletionActive(false);
      }

      function changeMail() {
         // TODO
      }

      function changePassword() {
         // TODO
      }

      function deleteAccount() {
         if (vm.deleteUserForm.$invalid) {
            return;
         }

         SessionService.setPageLoaded(false);

         FirebaseService.getAuth().$authWithPassword({
            email: AuthService.getUser().mail,
            password: vm.delete.password
         })
            .then(__deleteUser)
            .catch(function (error) {
               AlertsService.addAlert('alert', __getDeleteErrorMessage(error));
               __clearDeleteUserForm();
            }).finally(function () {
               SessionService.setPageLoaded(true);
            });
      }

      ////////////

      function __clearDeleteUserForm() {
         vm.delete.password = '';

         vm.deleteUserForm.$setPristine();
      }

      function __getDeleteErrorMessage(error) {
         var msg = gettextCatalog.getString('Unable to delete user {{login}}.', {login: AuthService.getUser().login});

         switch (error.code) {
            case 'INVALID_PASSWORD':
               msg = gettextCatalog.getString('Invalid password.');
               break;
         }

         return msg;
      }

      function __deleteUser() {
         var login = AuthService.getUser().login;

         return $q.when()
            .then(function () {
               AlertsService.cleanAlerts();
               AlertsService.notClearOnStateChange();
               AlertsService.addAlert('success', gettextCatalog.getString('User {{login}} has been successfully deleted.', {login: login}));
               return true;
            })
            .then(__deleteUserMetadata)
            .then(__deleteUserCredentials)
            .then($state.go('check'));
      }

      function __deleteUserMetadata() {
         var users = FirebaseService.getUsers();
         var logins = FirebaseService.getLogins();

         delete users[AuthService.getUser().uid];
         delete logins[AuthService.getUser().login];

         return $q.all([users.$save(), logins.$save()]);
      }

      function __deleteUserCredentials() {
         return FirebaseService.getAuth().$removeUser({
            email: AuthService.getUser().mail,
            password: vm.delete.password
         });
      }

   }

})();
