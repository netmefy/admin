(function () {
    'use strict';

    angular
        .module('fuse')
        .factory('httpRequestInterceptor', httpRequestInterceptor);

    httpRequestInterceptor.$inject = [
        '$q',
        '$injector'
    ];

    function httpRequestInterceptor($q, $injector) {
        var interceptorHttp = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError,
            redirectToLogin: redirectToLogin
        };

        return interceptorHttp;

        function request(config) {
            // do something on success
            return config;
        }

        function requestError(rejection) {
            return $q.reject(rejection);
        }

        function response(res) {
            return res;
        }

        function responseError(response) {
            if (response.status !== 200) {
                if (response.status === 403) {
                  /*--SI ES SESION EXPIRADA HAGO QUE SOLO MUESTRE UN CARTEL Y ME REDIRIJA AL LOGIN--*/
                  alert("Sesión Expirada.");
                  redirectToLogin();
                }
            }
        }

        function redirectToLogin() {
            var stateService = $injector.get('$state');
            stateService.go('app.login');
            return response;
        }

    }

})();
