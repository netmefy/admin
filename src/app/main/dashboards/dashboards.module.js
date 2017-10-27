(function ()
{
    'use strict';

    angular
        .module('app.dashboards',
          [
            'app.dashboards.general'
          ])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        // Navigation
        msNavigationServiceProvider.saveItem('principal', {
            title : 'PRINCIPAL',
            group : true,
            weight: 1
        });



      msNavigationServiceProvider.saveItem('general', {
        title: 'Dashboard',
        icon  : 'icon-view-dashboard',
        state: 'app.dashboards_general'
      });

     /* msNavigationServiceProvider.saveItem('dashboards.clientservice', {
        title: 'Servicios al Cliente',
        state: 'app.dashboards_clientservice'
      });*/


    }
})();
