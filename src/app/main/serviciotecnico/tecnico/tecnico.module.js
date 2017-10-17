(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.tecnico', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.serviciotecnico_tecnico', {
                url    : '/servicio-tecnico/tecnico',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/serviciotecnico/tecnico/tecnico.html',
                        controller : 'TecnicoController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/serviciotecnico/tecnico');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);



        msNavigationServiceProvider.saveItem('serviciotecnico.tecnico', {
            title    : 'Tecnicos',
            icon     : 'icon-worker',
            state    : 'app.serviciotecnico_tecnico',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'TECNICO.TECNICO_NAV',
            weight   : 1
        });
    }
})();
