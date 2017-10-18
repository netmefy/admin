(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.ot', ['datatables'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.serviciotecnico_ot', {
                url    : '/servicio-tecnico/ot',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/serviciotecnico/ot/ot.html',
                        controller : 'OTController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/serviciotecnico/ot');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

      msNavigationServiceProvider.saveItem('serviciotecnico', {
        title : 'SERVICIO TÉCNICO',
        group : true,
        weight: 1
      });

        msNavigationServiceProvider.saveItem('serviciotecnico.ot', {
            title    : 'Ordenes de Trabajo',
            icon     : 'icon-document',
            state    : 'app.serviciotecnico_ot',
            /*stateParams: {
                'param1': 'page'
             },*/
            translate: 'OT.OT_NAV',
            weight   : 1
        });
    }
})();
