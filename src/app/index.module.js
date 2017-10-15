(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

          // Login
            'app.login',

          // Dashboard
            'app.dashboard'

          /*// Notificaciones
          'app.promociones',

          // Promociones
            'app.promociones',

          // Gestion de Ordenes de trabajo
            'app.promociones'*/
        ]);
})();
