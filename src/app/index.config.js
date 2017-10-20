(function () {
  'use strict';

  angular
    .module('fuse')
    .config(config);

  /** @ngInject */
  function config($translateProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
    // Put your common app configurations here

// uiGmapgoogle-maps configuration
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAx9shjErSsODXNiTkhWgBdLx2nsHarSUg',
      v: '3.exp',
      libraries: 'weather,geometry,visualization'
    });
    // angular-translate configuration
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('es');
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $httpProvider.interceptors.push('httpRequestInterceptor');
  }

})();
