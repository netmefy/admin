(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.os', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.serviciotecnico_os', {
                url    : '/servicio-tecnico/os',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/serviciotecnico/os/os.html',
                        controller : 'OSController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/serviciotecnico/os');


        msNavigationServiceProvider.saveItem('serviciotecnico.os', {
            title    : 'Ordenes de Solicitud',
            icon     : 'icon-file-document',
            state    : 'app.serviciotecnico_os',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'OS.OS_NAV',
            weight   : 1
        });
    }
})();
