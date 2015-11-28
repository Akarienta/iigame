(function () {
   'use strict';

   angular
      .module('iigame.users')
      .controller('UsersCtrl', UsersCtrl);

   /** @ngInject */
   function UsersCtrl($log, FirebaseService, AuthService, AlertsService, SessionService, SecurityRulesService, gettextCatalog, ROLE, MODULE) {

      AuthService.checkAccess(MODULE.USERS);

      var vm = this;

      // fields
      vm.users = FirebaseService.getUsers();
      vm.logins = FirebaseService.getLogins();
      vm.areUsersDisabled = FirebaseService.areUsersDisabled();
      vm.addingUser = false;
      vm.newUser = {};
      vm.newUser.password = {};
      vm.newUser.role = null;
      vm.data = {};
      vm.areRulesShown = false;

      // methods
      vm.createUser = createUser;
      vm.createUserCancel = createUserCancel;
      vm.addUser = addUser;
      vm.getFirebaseSecurityUrl = getFirebaseSecurityUrl;
      vm.getAllowedJSON = getAllowedJSON;
      vm.getDisabledJSON = getDisabledJSON;
      vm.changeRulesVisibility = changeRulesVisibility;
      vm.getSnippetMsg = getSnippetMsg;

      ////////////

      function createUser() {
         if (vm.userForm.$invalid) {
            return;
         }

         SessionService.setPageLoaded(false);

         FirebaseService.getAuth().$createUser({
            email: vm.newUser.mail,
            password: vm.newUser.password.new
         }).then(function (userData) {
            AlertsService.addAlert('success', gettextCatalog.getString('User {{login}} was created.', {login: vm.newUser.login}));
            __saveUser(userData);
            __saveLogin();
         }).catch(function (error) {
            $log.error('Error while adding user:', error);
            AlertsService.addAlert('alert', gettextCatalog.getString('Something is wrong. Maybe user with e-mail {{mail}} exists already?', {mail: vm.newUser.mail}));
         }).finally(function () {
            __clearForm();
            addUser(false);
            SessionService.setPageLoaded(true);
         });
      }

      function createUserCancel() {
         addUser(false);
         __clearForm();
      }

      function addUser(value) {
         vm.addingUser = value;
      }

      function getFirebaseSecurityUrl() {
         return FirebaseService.getSecurityUrl();
      }

      function getAllowedJSON() {
         return __objectToJSON(SecurityRulesService.getAllowedRules());
      }

      function getDisabledJSON() {
         return __objectToJSON(SecurityRulesService.getDisabledRules());
      }

      function changeRulesVisibility() {
         vm.areRulesShown = !vm.areRulesShown;
      }

      function getSnippetMsg() {
         return vm.areRulesShown ? gettextCatalog.getString('Hide code snippet') : gettextCatalog.getString('Show code snippet');
      }

      ////////////

      function __saveUser(userData) {
         vm.users[userData.uid] = {
            login: vm.newUser.login,
            role: ROLE.getAll()[vm.newUser.role]
         };
         vm.users.$save();
      }

      function __saveLogin() {
         vm.logins[vm.newUser.login] = {
            mail: vm.newUser.mail
         };
         vm.logins.$save();
      }

      function __clearForm() {
         vm.newUser.login = '';
         vm.newUser.role = null;
         vm.newUser.mail = '';
         vm.newUser.password.new = '';
         vm.newUser.password.confirm = '';

         vm.userForm.$setPristine();
      }

      function __objectToJSON(object) {
         return JSON.stringify(object, null, 2);
      }

   }

})();
