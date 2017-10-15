(function ()
{
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController()
    {
        var vm = this;

        // Data
        vm.helloText = "este va a ser el dashboard";

        // Methods

        //////////
    }
})();
