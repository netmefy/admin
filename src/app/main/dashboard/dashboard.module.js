(function ()
{
    'use strict';

    angular
        .module('app.dashboard', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.dashboard', {
                url    : '/dashboard',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/dashboard/dashboard.html',
                        controller : 'DashboardController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/dashboard');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('principal', {
            title : 'PRINCIPAL',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('principal.dashboard', {
            title    : 'Panel de Control',
            icon     : 'icon-view-dashboard',
            state    : 'app.dashboard',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'DASHBOARD.DASHBOARD_NAV',
            weight   : 1
        });
    }
})();
