(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico.ot')
        .controller('NewOTController', NewOTController);

    /** @ngInject */
    function NewOTController(api,$scope, $document, $state, Ot)
    {
      var vm = this;
      vm.tecnicos=[];
      // Data
      vm.taToolbar = [
        ['wordcount', 'charcount']
      ];


      vm.ot = Ot;
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
          }, function (error) {
            alert("ERROR");
          });
      }

      function getClientes(){
        api.getClientes().then(
          function (response) {
            vm.clientes = response.data;
          }, function (error) {
            alert("ERROR");
          });
      }

      function getTiposOT(){
        api.getTiposOT().then(
          function (response) {
            vm.types = response.data;
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
        getClientes();
        getTiposOT();
      }

      /**
       * Save ot
       */
      function saveOt()
      {
        vm.otToSend = {
          cliente_sk: vm.selectedCliente.sk,
          tecnico_sk: vm.selectedTecnico.sk,
          descripcion: vm.to.description.replace(/<p>/g , "").replace(/<\/p>/g,""),
          tipo_id: vm.type
        };
        api.guardarOT(vm.otToSend).then(
          function (response) {
            $state.go('app.serviciotecnico_ot');
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
