(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.tecnico')
        .controller('TecnicoController', TecnicoController);

    /** @ngInject */
    function TecnicoController(api)
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
            targets: 3,
            render : function (data, type)
            {
              if ( type === 'display' )
              {
                if ( parseFloat(data) <= 2.5 )
                {
                  return '<div class="quantity-indicator md-red-500-bg"></div><div>' + data + '</div>';
                }
                else if ( parseFloat(data) > 2.5 && parseFloat(data) <= 3.5 )
                {
                  return '<div class="quantity-indicator md-amber-500-bg"></div><div>' + data + '</div>';
                }
                else
                {
                  return '<div class="quantity-indicator md-green-600-bg"></div><div>' + data + '</div>';
                }
              }

              return data;
            }
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
      vm.getTecnicos = getTecnicos;
      vm.gotoAddProduct = gotoAddProduct;
      vm.gotoProductDetail = gotoProductDetail;

      //////////

      function init() {
        getTecnicos();
      }

      function getTecnicos(){
        api.getTecnicos().then(
          function (response) {
            vm.tecnicos = response.data;
          }, function (error) {
            alert("ERROR");
          });
      }

      /**
       * Go to add product
       */
      function gotoAddProduct()
      {
        $state.go('app.e-commerce.products.add');
      }

      /**
       * Go to product detail
       *
       * @param id
       */
      function gotoProductDetail(id)
      {
        $state.go('app.e-commerce.products.detail', {id: id});
      }

      init();
    }
})();
