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
            })
          .state('app.serviciotecnico_os.detail', {
            url      : '/:id/:estado',
            views    : {
              'content@app': {
                templateUrl: 'app/main/serviciotecnico/os/os/os-edit.html',
                controller : 'EditOSController as vm'
              }
            },
            resolve  : {
              Ot: function ($stateParams)
              {
                var ot = {id:$stateParams.id, estado: $stateParams.estado};
                return ot;
              }
            }
          });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/serviciotecnico/os');
      $translatePartialLoaderProvider.addPart('app/main/serviciotecnico/os/os');

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
