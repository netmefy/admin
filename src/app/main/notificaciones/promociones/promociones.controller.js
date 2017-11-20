(function ()
{
    'use strict';

    angular
        .module('app.notificaciones.promociones')
        .controller('PromocionesController', PromocionesController);

    /** @ngInject */
    function PromocionesController(api, $state)
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
      vm.getPromociones = getPromociones;
      vm.gotoAddPromociones = gotoAddPromociones;
      vm.gotoPromocionDetail = gotoPromocionDetail;

      //////////

      function init() {
        getPromociones();
      }

      function gotoAddPromociones()
      {
        $state.go('app.notificaciones_promociones.add');
      }

      /**
       * Go to ot detail
       *
       * @param id
       */
      function gotoPromocionDetail(id)
      {
        $state.go('app.notificaciones_promociones.detail', {id: id});
      }

      function getPromociones(){
        api.getPromociones().then(
          function (response) {
            vm.promociones = response.data;
          }, function (error) {
            alert("ERROR");
          });
      }


      init();

    }
})();
