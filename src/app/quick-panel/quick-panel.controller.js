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
              numeroAMostrar:response.data.velocidad + " Mb",
              porcentaje: response.data.velocidad,
              color: "normal"
            };
            var stat2 = {
              title:"Calificación Promedio de los Técnicos: ",
              numeroAMostrar:response.data.promedio,
              porcentaje: (response.data.promedio * 100.0) / 5.0,
              color: "online"
            };
            var stat3 = {
              title:"Reclamos: ",
              numeroAMostrar:response.data.reclamos +" Reclamos / " + response.data.cantidadClientes + " Clientes",
              porcentaje: (response.data.reclamos * 100.0) / response.data.cantidadClientes,
              color: "alert"
            };
            var stat4 = {
              title:"Solicitudes: ",
              numeroAMostrar:response.data.solicitudes +" Solicitudes / " + response.data.cantidadClientes + " Clientes",
              porcentaje: (response.data.solicitudes * 100.0) / response.data.cantidadClientes,
              color: "warn"
            };

            vm.stats = [stat3,stat4,stat,stat2];


          }, function (error) {
            alert("ERROR");
          });

      }
      refreshGoogleMaps();
      vm.reclamosTickerInterval2 = $interval(function () {
        refreshGoogleMaps();
      }, 15000);

      // Cleanup
      $scope.$on('$destroy', function () {
        $interval.cancel(vm.reclamosTickerInterval2);
      });
    }

})();
