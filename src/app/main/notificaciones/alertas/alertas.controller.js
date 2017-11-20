(function ()
{
    'use strict';

    angular
        .module('app.notificaciones.alertas')
        .controller('AlertasController', AlertasController);

    /** @ngInject */
    function AlertasController(api, $state)
    {
      var vm = this;

      // Data


      vm.dtInstance = {};
      vm.dtOptions = {
        dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        columnDefs  : [
          {
            // Target the id column
            targets: 0,
            width  : '72px'
          }
        ],
        initComplete: function ()
        {
          var api = this.api(),
            searchBox = angular.element('body').find('#e-commerce-products-search');

          // Bind an external input as a table wide search box
          if ( searchBox.length > 0 )
          {
            searchBox.on('keyup', function (event)
            {
              api.search(event.target.value).draw();
            });
          }
        },
        pagingType  : 'simple',
        lengthMenu  : [10, 20, 30, 50, 100],
        pageLength  : 20,
        scrollY     : 'auto',
        responsive  : true
      };

      // Methods
      vm.getAlertas = getAlertas;
      vm.gotoAddAlerta = gotoAddAlerta;
      vm.gotoAlertaDetail = gotoAlertaDetail;

      //////////

      function init() {
        getAlertas();
      }

      function gotoAddAlerta()
      {
        $state.go('app.notificaciones_alertas.add');
      }

      /**
       * Go to ot detail
       *
       * @param id
       */
      function gotoAlertaDetail(id)
      {
        $state.go('app.notificaciones_alertas.detail', {id: id});
      }

      function getAlertas(){
        api.getAlertas().then(
          function (response) {
            vm.alertas = response.data;
          }, function (error) {
            alert("ERROR");
          });
      }


      init();

    }
})();
