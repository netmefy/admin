(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico', [
            'app.serviciotecnico.ot',
            'app.serviciotecnico.tecnico'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation

    }
})();
