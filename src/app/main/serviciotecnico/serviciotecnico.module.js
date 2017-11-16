(function ()
{
    'use strict';

    angular
        .module('app.serviciotecnico', [
            'app.serviciotecnico.ot',
            'app.serviciotecnico.os',
            'app.serviciotecnico.tecnico',
            'textAngular',
            'xeditable',
          'datatables',
          'flow'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation

    }
})();
