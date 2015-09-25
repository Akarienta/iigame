(function () {
   'use strict';

   angular
      .module('iigame.users')
      .controller('UsersCtrl', UsersCtrl);

   /** @ngAnotate */
   function UsersCtrl($q, $log, SessionService, AlertsService, gettextCatalog, ROLE) {

      var vm = this;

      // fields
      vm.loaded = false;
      vm.canAddUser = true;
      vm.userForm = {};
      vm.newUser = {};

      // methods
      vm.createUser = createUser;

      __init();

      ////////////

      function createUser() {
         if (vm.userForm.$invalid) {
            return;
         }

         SessionService.getAuth().then(function (auth) {
            auth.$createUser({
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
            });
         });
      }

      ////////////

      function __init() {
         __loadFirebaseObjects()
            .then(__isFirebaseLoaded)
            .then(__disableUserAdditionIfNeeded)
            .finally(function () {
               vm.loaded = true;
            })
      }

      function __loadFirebaseObjects() {
         return $q.all([
            SessionService.getUsers().then(function (users) {
               vm.users = users;
            }),
            SessionService.getLogins().then(function (logins) {
               vm.logins = logins;
            })
         ]);
      }

      function __isFirebaseLoaded() {
         return $q.all([
            vm.users.$loaded(),
            vm.logins.$loaded()
         ])
      }

      function __disableUserAdditionIfNeeded() {
         return vm.users.$save().catch(function () {
            vm.canAddUser = false;
         });
      }

      function __saveUser(userData) {
         vm.users[userData.uid] = {
            login: vm.newUser.login,
            role: ROLE.SUB
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
         vm.newUser.mail = '';
         vm.newUser.password.new = '';
         vm.newUser.password.confirm = '';

         vm.userForm.$setPristine();
      }

   }

})();
