(function ()
{
    'use strict';

    angular
        .module('app.dashboards.general')
        .controller('DashboardGeneralController', DashboardGeneralController);

    /** @ngInject */
    function DashboardGeneralController($scope, $interval, api)
    {
        var vm = this;
        vm.chart1=[
          {
            "key": "Reclamos",
            "values": []
          }
        ];

        // Widget 1
        vm.widget1 = {
            title   : "Reclamos",
            value   : "0",
            footnote: "",
            detail  : "Cantidad de reclamos sin solucionar (en estado abierto o en curso).",
            chart   : {
                config : {
                    refreshDataOnly: true,
                    deepWatchData  : true
                },
                options: {
                    chart: {
                        type        : 'lineChart',
                        color       : ['rgba(0, 0, 0, 0.54)'],
                        height      : 100,
                        margin      : {
                            top   : 8,
                            right : 0,
                            bottom: 0,
                            left  : 0
                        },
                        duration    : 1,
                        clipEdge    : false,
                        interpolate : 'cardinal',
                        interactive : false,
                        isArea      : true,
                        showLegend  : false,
                        showControls: false,
                        showXAxis   : false,
                        showYAxis   : false,
                        x           : function (d)
                        {
                            return d.x;
                        },
                        y           : function (d)
                        {
                            return d.y;
                        },
                        yDomain     : [0, 400]
                    }
                },
                data   :vm.chart1
            },
            init    : function ()
            {
                // Run this function once to initialize the widget

                // Grab the x value
                var x = vm.chart1[0].values.length - 1;


                function reclamosTicker()
                {
                    // Increase the x value
                  api.getReclamosActivos().then(
                    function (response) {
                      x++;
                      var newValue = {
                        x: x,
                        y: response.data.reclamos
                      };
                      vm.widget1.value = response.data.reclamos;
                      if(vm.widget1.chart.data[0].values.length == 25) {
                        vm.widget1.chart.data[0].values.shift();
                      }
                      vm.widget1.chart.data[0].values.push(newValue);
                    }, function (error) {
                      alert("ERROR");
                    });

                }

                // Set interval
                var reclamosTickerInterval = $interval(function ()
                {
                  reclamosTicker();
                }, 10000);

                // Cleanup
                $scope.$on('$destroy', function ()
                {
                    $interval.cancel(reclamosTickerInterval);
                });
            }
        };

      // Init Widget 1
      vm.widget1.init();

      vm.chart2=[
        {
          "key": "Solicitudes",
          "values": []
        }
      ];

      // Widget 2
      vm.widget2 = {
        title   : "Solicitudes",
        value   : "0",
        footnote: "",
        detail  : "Cantidad de solicitudes sin finalizar su gestión (en estado abierto o en curso).",
        chart   : {
          config : {
            refreshDataOnly: true,
            deepWatchData  : true
          },
          options: {
            chart: {
              type        : 'lineChart',
              color       : ['rgba(0, 0, 0, 0.54)'],
              height      : 100,
              margin      : {
                top   : 8,
                right : 0,
                bottom: 0,
                left  : 0
              },
              duration    : 1,
              clipEdge    : false,
              interpolate : 'cardinal',
              interactive : false,
              isArea      : true,
              showLegend  : false,
              showControls: false,
              showXAxis   : false,
              showYAxis   : false,
              x           : function (d)
              {
                return d.x;
              },
              y           : function (d)
              {
                return d.y;
              },
              yDomain     : [0, 400]
            }
          },
          data   :vm.chart2
        },
        init    : function ()
        {
          // Run this function once to initialize the widget

          // Grab the x value
          var x = vm.chart2[0].values.length - 1;


          function solicitudesTicker()
          {
            // Increase the x value
            api.getSolicitudesActivas().then(
              function (response) {
                x++;
                var newValue = {
                  x: x,
                  y: response.data.solicitudes
                };
                vm.widget2.value = response.data.solicitudes;
                if(vm.widget2.chart.data[0].values.length == 25) {
                  vm.widget2.chart.data[0].values.shift();
                }
                vm.widget2.chart.data[0].values.push(newValue);
              }, function (error) {
                alert("ERROR");
              });

          }

          // Set interval
          var solicitudesTickerInterval = $interval(function ()
          {
            solicitudesTicker();
          }, 10000);

          // Cleanup
          $scope.$on('$destroy', function ()
          {
            $interval.cancel(solicitudesTickerInterval);
          });
        }
      };

      // Init Widget 2
      vm.widget2.init();

      vm.widget3 ={
        title:"Vel Contratada Promedio",
        velocidad: 50,
        detail:"Velocidad promedio contratada por todos los usuarios registrados.",
        init : function () {
          api.getVelocidadPromedio().then(
            function (response) {
              vm.widget3.velocidad = response.data.velocidad;
            }, function (error) {
              alert("ERROR");
            });
        }
      };

      vm.widget3.init();

      vm.widget4 ={
        title:"Calificación Promedio Técnicos",
        promedio: 3,
        porcentaje: 60,
        detail:"Calificación promedio otorgada a los técnicos al realizar las instalaciones y reparaciones.",
        init : function () {
          api.getCalificacionPromedio().then(
            function (response) {
              vm.widget3.promedio = response.data.promedio;
              vm.widget3.porcentaje = (response.data.promedio * 100.0)/5.0;
            }, function (error) {
              alert("ERROR");
            });
        }
      };

      vm.widget4.init();

      // Widget 6
      vm.widget6 = {
        title       : "Velocidades Contratadas",
        mainChart   : {
          config : {
            refreshDataOnly: true,
            deepWatchData  : true
          },
          options: {
            chart: {
              type        : 'pieChart',
              color       : ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107'],
              height      : 400,
              margin      : {
                top   : 0,
                right : 0,
                bottom: 0,
                left  : 0
              },
              donut       : true,
              clipEdge    : true,
              cornerRadius: 0,
              labelType   : 'percent',
              padAngle    : 0.02,
              x           : function (d)
              {
                return d.label;
              },
              y           : function (d)
              {
                return d.value;
              },
              tooltip     : {
                gravity: 's',
                classes: 'gravity-s'
              }
            }
          },
          data   : []
        },
        init        : function ()
        {

          api.getVelocidadesContratadas().then(
            function (response) {
              angular.forEach(response.data, function (data, index)
              {
                vm.widget6.mainChart.data[index] = {
                  label: data.nombre,
                  value: data.valor
                };
              });

            }, function (error) {
              alert("ERROR");
            });

        }
      };

    }
})();
