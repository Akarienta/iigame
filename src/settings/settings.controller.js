(function () {
   'use strict';

   angular
      .module('iigame.settings')
      .controller('SettingsCtrl', SettingsCtrl);

   /** @ngInject */
   function SettingsCtrl($q, $state, $firebaseObject, AuthService, SessionService, FirebaseService, AlertsService, gettextCatalog, MODULE) {

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
      vm.getMail = getMail;

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
         if (vm.changeMailForm.$invalid) {
            return;
         }

         SessionService.setPageLoaded(false);

         FirebaseService.getAuth().$changeEmail({
            oldEmail: AuthService.getUser().mail,
            newEmail: vm.mail.new,
            password: vm.mail.password
         })
            .then(__changeLoginMetadata)
            .then(function () {
               AuthService.setMail(vm.mail.new);
               AlertsService.addAlert('success', gettextCatalog.getString('E-mail for user {{login}} has been successfully changed.', {login: AuthService.getUser().login}));
               __clearChangeMailForm();
            })
            .catch(function (error) {
               AlertsService.addAlert('alert', __getChangeMailErrorMessage(error));
            }).finally(function () {
               SessionService.setPageLoaded(true);
            });
      }

      function changePassword() {
         if (vm.changePasswdForm.$invalid) {
            return;
         }

         SessionService.setPageLoaded(false);

         FirebaseService.getAuth().$changePassword({
            email: AuthService.getUser().mail,
            oldPassword: vm.password.old,
            newPassword: vm.password.new
         })
            .then(function () {
               AlertsService.addAlert('success', gettextCatalog.getString('Password for user {{login}} has been successfully changed.', {login: AuthService.getUser().login}));
               __clearChangePasswordForm();
            })
            .catch(function (error) {
               AlertsService.addAlert('alert', __getChangePasswordErrorMessage(error));
            }).finally(function () {
               SessionService.setPageLoaded(true);
            });
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

      function getMail() {
         return AuthService.getUser().mail;
      }

      ////////////

      function __clearDeleteUserForm() {
         vm.delete = {};

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
               $state.go('check');
               return true;
            })
            .then(__deleteUserMetadata)
            .then(__deleteUserCredentials);
      }

      function __deleteUserMetadata() {
         return $q.when()
            .then($firebaseObject(FirebaseService.getLogins().$ref().child(AuthService.getUser().login)).$remove())
            .then($firebaseObject(FirebaseService.getUsers().$ref().child(AuthService.getUser().uid)).$remove());
      }

      function __deleteUserCredentials() {
         return FirebaseService.getAuth().$removeUser({
            email: AuthService.getUser().mail,
            password: vm.delete.password
         });
      }

      function __changeLoginMetadata() {
         var logins = FirebaseService.getLogins();

         logins[AuthService.getUser().login].mail = vm.mail.new;

         return logins.$save();
      }

      function __getChangeMailErrorMessage(error) {
         var msg = gettextCatalog.getString('Unable change e-mail for user {{login}}.', {login: AuthService.getUser().login});

         switch (error.code) {
            case 'INVALID_PASSWORD':
               vm.mail.password = '';
               vm.changeMailForm.$setPristine();
               msg = gettextCatalog.getString('Invalid password.');
               break;
         }

         return msg;
      }

      function __clearChangeMailForm() {
         vm.mail = {};

         vm.changeMailForm.$setPristine();
      }

      function __getChangePasswordErrorMessage(error) {
         var msg = gettextCatalog.getString('Unable change password for user {{login}}.', {login: AuthService.getUser().login});

         switch (error.code) {
            case 'INVALID_PASSWORD':
               vm.password.old = '';
               vm.changePasswdForm.$setPristine();
               msg = gettextCatalog.getString('Invalid password.');
               break;
         }

         return msg;
      }

      function __clearChangePasswordForm() {
         vm.password = {};

         vm.changePasswdForm.$setPristine();
      }

   }

})();
