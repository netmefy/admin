(function ()
{
    'use strict';

    angular
        .module('app.notificaciones.alertas')
        .controller('AlertaController', AlertaController);

    /** @ngInject */
    function AlertaController(api,$scope, $document, $state, Alerta)
    {
      var vm = this;
      vm.tecnicos=[];
      // Data
      vm.taToolbar = [
        ['wordcount', 'charcount']
      ];


      vm.alerta = Alerta;
      vm.categoriesSelectFilter = '';

      vm.dropping = false;

      // Methods
      vm.saveOt = saveOt;
      vm.gotoOts = gotoOts;
      vm.onCategoriesSelectorOpen = onCategoriesSelectorOpen;
      vm.onCategoriesSelectorClose = onCategoriesSelectorClose;
      vm.isFormValid = isFormValid;

      //////////

      function getLocalidades(){
        api.getLocalidades().then(
          function (response) {
            vm.localidades = response.data;
          }, function (error) {
            alert("ERROR");
          });
      }


      /**
       * Initialize
       */
      function init()
      {
        getLocalidades();
      }

      /**
       * Save ot
       */
      function saveOt()
      {
        // Since we have two-way binding in place, we don't really need
        // this function to update the ots array in the demo.
        // But in real world, you would need this function to trigger
        // an API call to update your database.
        vm.alertaToSend = {
          notificacion_desc: vm.alerta.name,
          notificacion_texto: vm.alerta.description.replace(/<p>/g , "").replace(/<\/p>/g,""),
          localidad_sk: vm.selectedLocalidad.id,
          notificacion_tipo: "Alerta"
        };
        api.notificacionesZona(vm.alertaToSend).then(
          function (response) {
            $state.go('app.notificaciones_alertas');
          }, function (error) {
            alert("ERROR");
          });
      }

      /**
       * Go to ots page
       */
      function gotoOts()
      {
        $state.go('app.notificaciones_alertas');
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
