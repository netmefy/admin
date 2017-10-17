(function ()
{
    'use strict';

    angular
        .module('app.notificaciones.promociones')
        .controller('PromocionesController', PromocionesController);

    /** @ngInject */
    function PromocionesController(api)
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
          },
          {
            // Target the quantity column
            targets: 4,
            render : function (data, type)
            {
              if ( type === 'display' )
              {
                if ( data==  'Inactiva' )
                {
                  return '<span class="text-boxed m-0 md-orange-800-bg white-fg">' + data + '</span>';
                }
                else if ( data == 'Activa' )
                {
                  return '<div class="quantity-indicator md-green-600-bg"></div><div>' + data + '</div>';
                }
              }

              return data;
            }
          },
          {
            // Target the actions column
            targets           : 5,
            responsivePriority: 1,
            filterable        : false,
            sortable          : false
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
        //$state.go('app.serviciotecnico_ot.add');
      }

      /**
       * Go to ot detail
       *
       * @param id
       */
      function gotoPromocionDetail(id)
      {
        //$state.go('app.serviciotecnico_ot.detail', {id: id});
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
