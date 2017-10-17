(function ()
{
    'use strict';

    angular
        .module('app.notificaciones.promociones', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.notificaciones_promociones', {
                url    : '/notificaciones/promociones',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/notificaciones/promociones/promociones.html',
                        controller : 'PromocionesController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/notificaciones/promociones');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);


        msNavigationServiceProvider.saveItem('notificaciones.promociones', {
            title    : 'Promociones',
            icon     : 'icon-ticket',
            state    : 'app.notificaciones_promociones',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'PROMOCIONES.PROMOCIONES_NAV',
            weight   : 1
        });
    }
})();
