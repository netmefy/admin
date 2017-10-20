(function ()
{
    'use strict';

    angular
        .module('app.dashboards.general',
            [
                // 3rd Party Dependencies
                'nvd3',
                'datatables',
              'uiGmapgoogle-maps'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider.state('app.dashboards_general', {
            url      : '/dashboard-general',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/dashboards/general/dashboard-general.html',
                    controller : 'DashboardGeneralController as vm'
                }
            },
            bodyClass: 'dashboard-general'
        });
    }

})();
