(function () {
   'use strict';

   angular
      .module('iigame.users')
      .controller('UsersCtrl', UsersCtrl);

   /** @ngAnotate */
   function UsersCtrl($log, $window, $scope, FirebaseService, AlertsService, AuthService, gettextCatalog, inAuthData, ROLE, MODULE) {

      var vm = this;

      $scope.$on('userUpdated', function (event, authData) {
         AuthService.checkAccess(authData, MODULE.USERS);
      });

      // fields
      vm.loaded = false;
      vm.addingUser = false;
      vm.canAddUser = true;
      vm.userForm = {};
      vm.newUser = {};
      vm.newUser.password = {};
      vm.newUser.role = null;

      // methods
      vm.createUser = createUser;
      vm.createUserCancel = createUserCancel;
      vm.addUser = addUser;
      vm.goToFirebaseSecurity = goToFirebaseSecurity;

      __init();

      ////////////

      function createUser() {
         if (vm.userForm.$invalid) {
            return;
         }

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
         });
      }

      function createUserCancel() {
         addUser(false);
         __clearForm();
      }

      function addUser(value) {
         vm.addingUser = value;
      }

      function goToFirebaseSecurity() {
         FirebaseService.getSecurityUrlPromise().then(function (url) {
            $window.open(url);
         });
      }

      ////////////

      function __init() {
         AuthService.initController(inAuthData, MODULE.USERS)
            .then(__loadData)
            .then(__disableUserAdditionIfNeeded)
            .finally(function () {
               vm.loaded = true;
            })
      }

      function __loadData() {
         vm.users = FirebaseService.getUsers();
         vm.logins = FirebaseService.getLogins();
         return true;
      }

      function __disableUserAdditionIfNeeded() {
         return vm.users.$save().catch(function () {
            vm.canAddUser = false;
         });
      }

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

   }

})();
