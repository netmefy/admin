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
            })
          .state('app.serviciotecnico_ot.add', {
            url      : '/add',
            views    : {
              'content@app': {
                templateUrl: 'app/main/serviciotecnico/ot/ot/ot.html',
                controller : 'NewOTController as vm'
              }
            },
            resolve: {
              Ot: function ()
              {
                return null;
              }
            }
          })
          .state('app.serviciotecnico_ot.detail', {
            url      : '/:id/:tecnico_sk/:estado',
            views    : {
              'content@app': {
                templateUrl: 'app/main/serviciotecnico/ot/ot/ot-edit.html',
                controller : 'EditOTController as vm'
              }
            },
            resolve  : {
              Ot: function ($stateParams)
              {
                var ot = {id:$stateParams.id, tecnico_sk: $stateParams.tecnico_sk, estado: $stateParams.estado};
                return ot;
              }
            }
          });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/serviciotecnico/ot');
        $translatePartialLoaderProvider.addPart('app/main/serviciotecnico/ot/ot');


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
