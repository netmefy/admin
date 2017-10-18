(function ()
{
    'use strict';

    angular
        .module('app.dashboards',
          [
            'app.dashboards.general'
            /*'app.dashboards.clientservice',
            'app.dashboards.social'*/
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

      msNavigationServiceProvider.saveItem('dashboards', {
        title : 'Dashboards',
        icon  : 'icon-view-dashboard',
        weight: 1
      });

      msNavigationServiceProvider.saveItem('dashboards.general', {
        title: 'General',
        state: 'app.dashboards_general'
      });

     /* msNavigationServiceProvider.saveItem('dashboards.clientservice', {
        title: 'Servicios al Cliente',
        state: 'app.dashboards_clientservice'
      });

      msNavigationServiceProvider.saveItem('dashboards.social', {
        title: 'Social',
        state: 'app.dashboards_social'
      });*/

    }
})();
