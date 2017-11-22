(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.ot')
        .controller('EditOTController', EditOTController);

    /** @ngInject */
    function EditOTController(api,$scope, $document, $state, Ot , $filter)
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

      function getTecnicos(){
        api.getTecnicos().then(
          function (response) {
            vm.tecnicos = response.data;
            var foundItem = {};

            for (var i = 0; i < vm.tecnicos.length ; i++) {
              if (vm.tecnicos[i].sk == vm.ot.tecnico_sk) {
                foundItem = vm.tecnicos[i];
              }
            }
            vm.selectedTecnico = foundItem;
          }, function (error) {
            alert("ERROR");
          });
      }






      /**
       * Initialize
       */
      function init()
      {
        getTecnicos();

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

          vm.otToSend = {
            ot_id: vm.ot.id,
            tecnico_sk: vm.selectedTecnico.sk
          };
          api.guardarOTEditada(vm.otToSend).then(
            function (response) {
              if(vm.type != vm.estadoactual+1){
                vm.statusToSend = {
                  ot_id: vm.ot.id,
                  estado_sk: vm.type,
                  comentarios: vm.to.description.replace(/<p>/g , "").replace(/<\/p>/g,"")
                };

                api.guardarEstadoOT(vm.statusToSend).then(
                  function (response) {
                    $state.go('app.serviciotecnico_ot');
                  }, function (error) {
                    alert("ERROR");
                  });
              }else{
                $state.go('app.serviciotecnico_ot');
              }


            }, function (error) {
              alert("ERROR");
            });





      }

      /**
       * Go to ots page
       */
      function gotoOts()
      {
        $state.go('app.serviciotecnico_ot');
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
