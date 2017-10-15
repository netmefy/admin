(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($localStorage,$state) {
    var vm = this;
    // Data
    vm.loginUser = loginUser;
    vm.logout = logout;

    // Methods
    init();

    function loginUser() {
      $localStorage.token = "un token"; //TODO: grabar el token que venga de la api.
      //$http.defaults.headers.common.Authorization = 'Bearer ' + headers('Token');
      $state.go('app.dashboard');
    }

    function init() {
      logout();
    }

    function logout() {
      delete $localStorage.token;
    }

    //////////
  }
})();
