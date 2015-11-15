(function () {
   'use strict';

   angular
      .module('iigame.passwords')
      .controller('PasswordsCtrl', PasswordsCtrl);

   /** @ngInject */
   function PasswordsCtrl(AuthService, FirebaseService, SessionService, AlertsService, ModalService, gettextCatalog, MODULE, PASSWORD_TYPE) {

      AuthService.checkAccess(MODULE.PASSWORDS);

      var vm = this;

      // fields
      vm.password = {};
      vm.passwords = FirebaseService.getPasswords();
      vm.addingPassword = false;

      // methods
      vm.setAddingPassword = setAddingPassword;
      vm.addPasswordCancel = addPasswordCancel;
      vm.addPassword = addPassword;
      vm.deletePassword = deletePassword;
      vm.openModal = ModalService.openPasswordDetailModal;

      ////////////

      function setAddingPassword(value) {
         vm.addingPassword = value;
      }

      function addPasswordCancel() {
         __clearForm();
         setAddingPassword(false);
      }

      function addPassword() {
         if (vm.paaswordForm.$invalid) {
            return;
         }

         SessionService.setPageLoaded(false);

         if (vm.passwords.hasOwnProperty(vm.password.password)) {
            AlertsService.addAlert('alert', gettextCatalog.getString('Password {{password}} already exists.', {password: vm.password.password}));
            SessionService.setPageLoaded(true);
            return;
         }

         vm.passwords[vm.password.password] = {
            password: vm.password.password,
            type: PASSWORD_TYPE.getAll()[vm.password.type],
            text: vm.password.text
         };

         vm.passwords.$save().then(function () {
            AlertsService.addAlert('success', gettextCatalog.getString('Password {{password}} was added.', {password: vm.password.password}));
            SessionService.setPageLoaded(true);
            addPasswordCancel();
         });
      }

      function deletePassword(password) {
         SessionService.setPageLoaded(false);

         delete vm.passwords[password];

         vm.passwords.$save().then(function() {
            AlertsService.addAlert('success', gettextCatalog.getString('Password {{password}} was deleted.', {password: password}));
            SessionService.setPageLoaded(true);
         })
      }

      ////////////

      function __clearForm() {
         vm.password = {};

         vm.paaswordForm.$setPristine();
      }

   }

})();
