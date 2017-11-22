(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.ot')
        .controller('EditOSController', EditOSController);

    /** @ngInject */
    function EditOSController(api,$scope, $document, $state, Ot , $filter)
    {
      var vm = this;
      vm.tecnicos=[];
      // Data
      vm.taToolbar = [
        ['wordcount', 'charcount']
      ];


      vm.ot = Ot;
      vm.estadoactual = 0;
      vm.types = [{id:1, descripcion:"Abierto"},
        {id:2, descripcion:"En Curso"},
        {id:3, descripcion:"Cerrado"}];
      vm.categoriesSelectFilter = '';

      vm.dropping = false;

      // Methods
      vm.saveOt = saveOt;
      vm.gotoOts = gotoOts;
      vm.onCategoriesSelectorOpen = onCategoriesSelectorOpen;
      vm.onCategoriesSelectorClose = onCategoriesSelectorClose;
      vm.isFormValid = isFormValid;

      //////////







      /**
       * Initialize
       */
      function init()
      {

        for (var i = 0 ; i< vm.types.length ; i++){
          if (vm.ot.estado == vm.types[i].descripcion){
            vm.estadoactual=i;
          }
        }
        vm.type = vm.types[vm.estadoactual].id;
      }

      /**
       * Save ot
       */
      function saveOt()
      {
        if(vm.type != vm.estadoactual+1){
          vm.statusToSend = {
            os_id: vm.ot.id,
            estado_sk: vm.type,
            comentarios: vm.to.description.replace(/<p>/g , "").replace(/<\/p>/g,"")
          };

          api.guardarEstadoOS(vm.statusToSend).then(
            function (response) {
              $state.go('app.serviciotecnico_os');
            }, function (error) {
              alert("ERROR");
            });
        }else{
          $state.go('app.serviciotecnico_os');
        }
      }

      /**
       * Go to ots page
       */
      function gotoOts()
      {
        $state.go('app.serviciotecnico_os');
      }

      /**
       * On categories selector open
       */
      function onCategoriesSelectorOpen()
      {
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $document.find('md-select-header input[type="search"]').on('keydown', function (e)
        {
          e.stopPropagation();
        });
      }

      /**
       * On categories selector close
       */
      function onCategoriesSelectorClose()
      {
        // Clear the filter
        vm.categoriesSelectFilter = '';

        // Unbind the input event
        $document.find('md-select-header input[type="search"]').unbind('keydown');
      }


      /**
       * Checks if the given form valid
       *
       * @param formName
       */
      function isFormValid(formName)
      {
        if ( $scope[formName] && $scope[formName].$valid )
        {
          return $scope[formName].$valid;
        }
      }


      init();

    }
})();
