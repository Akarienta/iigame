(function () {
   'use strict';

   angular
      .module('iigame.passwords')
      .controller('PasswordsCtrl', PasswordsCtrl);

   /** @ngInject */
   function PasswordsCtrl($q, AuthService, FirebaseService, SessionService, AlertsService, ModalService, gettextCatalog, MODULE, PASSWORD_TYPE, md5) {

      AuthService.checkAccess(MODULE.PASSWORDS);

      var vm = this;

      // fields
      vm.password = {};
      vm.encryptedPasswords = FirebaseService.getEncryptedPasswords();
      vm.decryptedPasswords = FirebaseService.getDecryptedPasswords();
      vm.addingPassword = false;

      // methods
      vm.setAddingPassword = setAddingPassword;
      vm.addPasswordCancel = addPasswordCancel;
      vm.addPassword = addPassword;
      vm.deletePassword = deletePassword;
      vm.openModal = ModalService.openPasswordDetailModal;

      // password fields
      vm.getencryptedPassword = getEncryptedPassword;
      vm.getPasswordType = getPasswordType;
      vm.getPasswordText = getPasswordText;

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
         var encryptedPassword = md5.createHash(vm.password.password);

         if (vm.encryptedPasswords.hasOwnProperty(encryptedPassword)) {
            AlertsService.addAlert('alert', gettextCatalog.getString('Password {{password}} already exists.', {password: vm.password.password}));
            SessionService.setPageLoaded(true);
            return;
         }

         vm.encryptedPasswords[encryptedPassword] = {
            password: encryptedPassword,
            type: PASSWORD_TYPE.getAll()[vm.password.type],
            text: vm.password.text
         };

         vm.decryptedPasswords[encryptedPassword] = {
            encrypted: encryptedPassword,
            decrypted: vm.password.password
         };

         $q.all([
            vm.encryptedPasswords.$save(),
            vm.decryptedPasswords.$save()
         ]).then(function () {
            AlertsService.addAlert('success', gettextCatalog.getString('Password {{password}} was added.', {password: vm.password.password}));
            SessionService.setPageLoaded(true);
            addPasswordCancel();
         });
      }

      function deletePassword(password) {
         var decryptedPassword = vm.decryptedPasswords[password].decrypted;

         ModalService.openConfirmDeletionModal(decryptedPassword).result.then(function (confirmation) {
            if (confirmation) {
               SessionService.setPageLoaded(false);

               delete vm.encryptedPasswords[password];
               delete vm.decryptedPasswords[password];

               $q.all([
                  vm.encryptedPasswords.$save(),
                  vm.decryptedPasswords.$save()
               ]).then(function () {
                  AlertsService.addAlert('success', gettextCatalog.getString('Password {{password}} was deleted.', {password: decryptedPassword}));
                  SessionService.setPageLoaded(true);
               })
            }
         });
      }

      function getEncryptedPassword(encryptedPassword) {
         return vm.encryptedPasswords[encryptedPassword].password;
      }

      function getPasswordType(encryptedPassword) {
         return vm.encryptedPasswords[encryptedPassword].type;
      }

      function getPasswordText(encryptedPassword) {
         return vm.encryptedPasswords[encryptedPassword].text;
      }

      ////////////

      function __clearForm() {
         vm.password = {};

         vm.paaswordForm.$setPristine();
      }

   }

})();
