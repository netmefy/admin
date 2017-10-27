(function ()
{
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('QuickPanelController', QuickPanelController);

    /** @ngInject */
    function QuickPanelController(api, $interval, $scope)
    {
        var vm = this;

        // Data
        vm.date = new Date();
        vm.settings = {
            notify: true,
            cloud : false,
            retro : true
        };

      vm.stats = [];

      function refreshGoogleMaps() {
        api.getZonasEnProblemas().then(
          function (response) {
            vm.zonesInDanger = [];
            for (var i = 0; i < response.data.length; i++) {

              var zone = {
                localidad:response.data[i].nombreDeLocalidad,
                clientes: response.data[i].cantidadDeUsuariosAfectados,
                marker : {
                  "id": i + 1,
                  "coords": {
                    "latitude": response.data[i].latitud,
                    "longitude": response.data[i].longitud
                  },
                  "show": false,
                  "sessions": response.data[i].cantidadDeUsuariosAfectados + " clientes afectados en la zona" + response.data[i].nombreDeLocalidad
                }
              };

              vm.zonesInDanger.push(zone);
            }

          }, function (error) {
            alert("ERROR");
          });




        api.getReclamosActivos("ARGENTINA").then(
          function (response) {
            var stat = {
              title:"Velocidad Promedio: ",
              numeroAMostrar:response.data.velocidad,
              porcentaje: response.data.velocidad,
              color: "online"
            };
            var stat2 = {
              title:"Calificación Promedio de los Técnicos: ",
              numeroAMostrar:response.data.promedio,
              porcentaje: (response.data.promedio * 100.0) / 5.0,
              color: "warn"
            };
            vm.stats = [stat,stat2];


          }, function (error) {
            alert("ERROR");
          });

      }
      refreshGoogleMaps();
      vm.reclamosTickerInterval = $interval(function () {
        refreshGoogleMaps();
      }, 15000);

      // Cleanup
      $scope.$on('$destroy', function () {
        $interval.cancel(vm.reclamosTickerInterval);
      });
    }

})();
