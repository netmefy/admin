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


      /**
       * Initialize
       */
      function init()
      {
        getTecnicos();
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
        if ( vm.ot.id )
        {

        }
        else
        {

        }

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
