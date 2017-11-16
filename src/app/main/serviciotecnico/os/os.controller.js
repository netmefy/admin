(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.os')
        .controller('OSController', OSController);

    /** @ngInject */
    function OSController(api)
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
            targets: 6,
            render : function (data, type)
            {
              if ( type === 'display' )
              {
                if ( data==  'Abierto' )
                {
                  return '<span class="text-boxed m-0 md-light-blue-600-bg white-fg">' + data + '</span>';
                }
                else if ( data == 'En Curso' )
                {
                  return '<span class="text-boxed m-0 md-amber-600-bg white-fg">' + data + '</span>';
                }
                else if ( data == 'Cerrado' )
                {
                  return '<span class="text-boxed m-0 md-green-600-bg white-fg">' + data + '</span>';
                }
              }

              return data;
            }
          },
          {
            // Target the actions column
            targets           : 7,
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
      vm.getOSs = getOSs;
      vm.gotoAddOS = gotoAddOS;
      vm.gotoOSDetail = gotoOSDetail;

      //////////

      function init() {
        getOSs();
      }

      function gotoAddOS()
      {
        //$state.go('app.serviciotecnico_ot.add');
      }

      /**
       * Go to ot detail
       *
       * @param id
       */
      function gotoOSDetail(id)
      {
        //$state.go('app.serviciotecnico_ot.detail', {id: id});
      }

      function getOSs(){
        api.getOSs().then(
          function (response) {
            vm.oss = response.data;
          }, function (error) {
            alert("ERROR");
          });
      }


      init();

    }
})();
