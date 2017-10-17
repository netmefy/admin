(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(config);

    /** @ngInject */
    function config($translateProvider, $httpProvider)
    {
        // Put your common app configurations here

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('es');
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }

})();
