(function ()
{
    'use strict';

    angular
        .module('app.notificaciones', [
            'app.notificaciones.alertas',
            'app.notificaciones.promociones'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation

    }
})();
