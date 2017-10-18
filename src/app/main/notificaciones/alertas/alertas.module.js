(function ()
{
    'use strict';

    angular
        .module('app.notificaciones.alertas', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.notificaciones_alertas', {
                url    : '/notificaciones/alertas',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/notificaciones/alertas/alertas.html',
                        controller : 'AlertasController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/notificaciones/alertas');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

      msNavigationServiceProvider.saveItem('notificaciones', {
        title : 'NOTIFICACIONES',
        group : true,
        weight: 1
      });

        msNavigationServiceProvider.saveItem('notificaciones.alertas', {
            title    : 'Alertas',
            icon     : 'icon-bell-ring-outline',
            state    : 'app.notificaciones_alertas',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'ALERTAS.ALERTAS_NAV',
            weight   : 1
        });
    }
})();
