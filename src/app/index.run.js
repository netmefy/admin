(function () {
  'use strict';

  angular
    .module('fuse')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $timeout, $state, $location, $localStorage, $http) {
    delete $http.defaults.headers.common.Authorization;
    if ($localStorage.token) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      if ($location.path() !== '/login' && !$localStorage.token) {
        $location.path('/login');
      }
    });


    // Activate loading indicator
    var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function () {
      $rootScope.loadingProgress = true;
    });

    // De-activate loading indicator
    var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function () {
      $timeout(function () {
        $rootScope.loadingProgress = false;
      });
    });

    // Store state in the root scope for easy access
    $rootScope.state = $state;

    // Cleanup
    $rootScope.$on('$destroy', function () {
      stateChangeStartEvent();
      stateChangeSuccessEvent();
    });
  }
})();
