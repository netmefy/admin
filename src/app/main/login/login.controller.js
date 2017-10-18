(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($localStorage,$state, api, $http) {
    var vm = this;
    // Data
    vm.loginUser = loginUser;
    vm.logout = logout;
    delete $http.defaults.headers.common.Authorization;
    // Methods
    init();

    function loginUser() {

      var params = {
        grant_type:"password",
        userName:vm.form.email,
        password:vm.form.password,
        client_id:"Utn.Ba$"
      };

      api.loginAndGetToken(params).then(
        function (response) {
          $localStorage.token = response.data.access_token;
          $localStorage.email = vm.form.email;
          $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
          $state.go('app.dashboards_general');
        }, function (error) {

        });

    }

    function init() {
      logout();
    }

    function logout() {
      delete $localStorage.token;
      delete $localStorage.email;
    }

    //////////
  }
})();
