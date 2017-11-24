(function () {
  'use strict';

  angular
    .module('app.dashboards.general')
    .controller('DashboardGeneralController', DashboardGeneralController);

  /** @ngInject */
  function DashboardGeneralController($scope, $interval, api, uiGmapGoogleMapApi) {
    var vm = this;
    vm.getTecnicos = getTecnicos;
    vm.getLikes = getLikes;
    vm.getTopUsuariosReclamanByZone = getTopUsuariosReclamanByZone;
    vm.zones = [
      {
        id: 0, nombre: "ARGENTINA", descripcion: "Todas las zonas agregadas"
      },
      {
        id: 1, nombre: "AMBA", descripcion: "Bs. As. + Capital Federal"
      },
      {
        id: 2, nombre: "MEDITERRANEA", descripcion: "Cordoba, San Luis, Mendoza, San Juan y La Rioja"
      },
      {
        id: 3, nombre: "LITORAL", descripcion: "Santa Fe, Entre Rios, Corrientes y Misiones"
      },
      {
        id: 4, nombre: "NORTE", descripcion: "Tucumám, Salta, Jujuy, Catamarca, Santiago del Estero, Chaco y Formosa"
      },
      {
        id: 5,
        nombre: "SUR",
        descripcion: "La Pampa, Neuquen, Rio Negro, Chubut, Santa Cruz, Tierra del Fuego y Malvinas"
      }
    ];
    vm.selectedZone = vm.zones[0];
    vm.showProgrees = true;

    vm.selectZone = selectZone;
    vm.widget10= {
      title: "Zonas con Problemas",
      map : {
        "center": {
          "latitude": -40.4161,
          "longitude": -63.6167
        },
        "zoom": 4,
        "options": {
          "minZoom": 3,
          "scrollwheel": true
        },
        "markers": []
      }
    };

    function selectZone(zone) {
      vm.showProgrees = true;
      $interval.cancel(vm.reclamosTickerInterval);
      vm.selectedZone = zone;
      vm.widget2.init();
      vm.widget3.init();
      vm.widget4.init();
      getOTsPerDay(); //init widget 5
      vm.widget6.init();
      vm.widget7.init();
      vm.widget8.init();
      vm.widget1.init();
      getTecnicos();
    }

    vm.chart1 = [
      {
        "key": "Reclamos",
        "values": []
      }
    ];

    vm.chart2 = [
      {
        "key": "Solicitudes",
        "values": []
      }
    ];

    // Widget 2
    vm.widget2 = {
      title: "Solicitudes",
      value: "0",
      footnote: "",
      detail: "Cantidad de solicitudes sin finalizar su gestión (en estado abierto o en curso).",
      init: function () {

      }
    };

    vm.widget2.init();

    vm.widget3 = {
      title: "Vel Contratada Promedio",
      velocidad: 50,
      detail: "Velocidad promedio contratada por todos los usuarios registrados.",
      init: function () {

      }
    };
    vm.widget3.init();

    vm.widget4 = {
      title: "Calificación Promedio Técnicos",
      promedio: 3,
      porcentaje: 60,
      detail: "Calificación promedio otorgada a los técnicos al realizar las instalaciones y reparaciones.",
      init: function () {

      }
    };
    vm.widget4.init();

    // Widget 5
    vm.chart5 = [
      {
        "key": "OTs",
        "values": []
      }];

    vm.chart5StartDate = null;

    function getOTsPerDay() {
      api.getOTsPerDay(vm.selectedZone.nombre).then(
        function (response) {
          vm.chart5[0].values = [];
          vm.chart5StartDate = response.data.startDate;
          for (var i = 0; i < response.data.otsPorDia.length; i++) {
            var x = i + 1;
            var newValue = {
              x: x,
              y: response.data.otsPorDia[i]
            };
            vm.chart5[0].values.push(newValue);
          }
        }, function (error) {
          alert("ERROR");
        });
    }

    vm.widget5 = {
      title: "OTs Creadas por día",
      bigChart: {
        options: {
          chart: {
            type: 'lineWithFocusChart',
            color: ['#2196F3'],
            height: 400,
            margin: {
              top: 32,
              right: 32,
              bottom: 64,
              left: 48
            },
            isArea: true,
            useInteractiveGuideline: true,
            duration: 1,
            clipEdge: true,
            clipVoronoi: false,
            interpolate: 'cardinal',
            showLegend: false,
            x: function (d) {
              return d.x;
            },
            y: function (d) {
              return d.y;
            },
            xAxis: {
              showMaxMin: false,
              tickFormat: function (d) {
                var diaAtomar = new Date();
                diaAtomar.setYear(vm.chart5StartDate.substr(0, 4));
                diaAtomar.setMonth(vm.chart5StartDate.substr(5, 2)-1);
                diaAtomar.setDate(vm.chart5StartDate.substr(8, 2));
                //"2017-05-22T00:00:00"
                var date = new Date(diaAtomar.setDate(diaAtomar.getDate() + d -1));
                return d3.time.format('%d %b %y')(date);
              }
            },
            yAxis: {
              showMaxMin: false
            },
            x2Axis: {
              showMaxMin: false,tickFormat: function (d) {
                var diaAtomar = new Date();
                diaAtomar.setYear(vm.chart5StartDate.substr(0, 4));
                diaAtomar.setMonth(vm.chart5StartDate.substr(5, 2)-1);
                diaAtomar.setDate(vm.chart5StartDate.substr(8, 2));
                var date = new Date(diaAtomar.setDate(diaAtomar.getDate() + d -1));
                return d3.time.format('%d %b %y')(date);
              }
            },
            y2Axis: {
              showMaxMin: false
            },
            interactiveLayer: {
              tooltip: {
                gravity: 's',
                classes: 'gravity-s'
              }
            },
            legend: {
              margin: {
                top: 8,
                right: 0,
                bottom: 32,
                left: 0
              },
              rightAlign: false
            }
          }
        },
        data: vm.chart5
      }
    };
    getOTsPerDay();


    // Widget 6

    //TODO: VER LO DE CANTIDAD DE CLIENTES
    vm.widget6 = {
      title: "Velocidades Contratadas",
      cantidadClientes: 0,
      mainChart: {
        config: {
          refreshDataOnly: true,
          deepWatchData: true
        },
        options: {
          chart: {
            type: 'pieChart',
            color: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107'],
            height: 400,
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            donut: true,
            clipEdge: true,
            cornerRadius: 0,
            labelType: 'percent',
            padAngle: 0.02,
            x: function (d) {
              return d.label;
            },
            y: function (d) {
              return d.value;
            },
            tooltip: {
              gravity: 's',
              classes: 'gravity-s'
            }
          }
        },
        data: []
      },
      init: function () {


        vm.chart9 = [
          {
            'key': 'Reclamos',
            'color': '#d62728',
            'values': []

          }
        ];
        api.getVelocidadesContratadas(vm.selectedZone.nombre).then(
          function (response) {
            vm.widget6.mainChart.data = [];
            vm.chart9[0].values = [];
            angular.forEach(response.data, function (data, index) {
              vm.widget6.mainChart.data[index] = {
                label: data.nombre,
                value: data.valor
              };

              vm.chart9[0].values[index] = {
                'label': data.nombre,
                'value': data.cant_reclamos
              }


            });
            vm.widget9.data = vm.chart9;

          }, function (error) {
            alert("ERROR");
          });

      }
    };
    vm.widget6.init();


    vm.widget7 = {
      title: "Edad Promedio",
      edadPromedio: 50,
      detail: "Edad promedio de los usuarios registrados en la zona.",
      init: function () {

      }
    };
    vm.widget7.init();

    vm.widget8 = {
      title: "Dispositivos Promedio Por Cliente",
      dispositivos: 0,
      detail: "Dispositivos vinculados aproximadamente en la zona.",
      init: function () {

      }
    };
    vm.widget8.init();


    vm.widget9 = {
      title: "Reclamos por velocidad contratada",
      options: {
        chart: {
          type: 'multiBarHorizontalChart',
          height: 450,
          x: function (d) {
            return d.label;
          },
          y: function (d) {
            return d.value;
          },
          showControls: false,
          showValues: true,
          transitionDuration: 500,
          xAxis: {
            showMaxMin: false
          },
          yAxis: {
            axisLabel: 'Values',
            tickFormat: function (d) {
              return d;
            }
          }
        }
      },
      data: []
    };

    function refreshGoogleMaps() {
      api.getZonasEnProblemas().then(
        function (response) {
          vm.widget10.map.markers = [];
          for (var i = 0; i < response.data.length; i++) {
            var marker = {
              "id": i + 1,
              "coords": {
                "latitude": response.data[i].latitud,
                "longitude": response.data[i].longitud
              },
              "show": false,
              "sessions": "Existen " + response.data[i].cantidadDeUsuariosAfectados + " clientes afectados en la zona: " + response.data[i].nombreDeLocalidad
            }
            vm.widget10.map.markers.push(marker);
          }

        }, function (error) {
          alert("ERROR");
        });

    }

    function setGoogleMaps() {
      uiGmapGoogleMapApi.then(function (maps) {
        if (vm.selectZone.id == 0) {
          vm.widget10.map = {
            "center": {
              "latitude": -40.4161,
              "longitude": -63.6167
            },
            "zoom": 4,
            "options": {
              "minZoom": 3,
              "scrollwheel": true
            },
            "markers": []
          };
        } else if (vm.selectZone.id == 1) {
          vm.widget10.map = {
            "center": {
              "latitude": -34.6037,
              "longitude": -58.3816
            },
            "zoom": 5,
            "options": {
              "minZoom": 3,
              "scrollwheel": true
            },
            "markers": []
          };
        } else if (vm.selectZone.id == 2) {
          vm.widget10.map = {
            "center": {
              "latitude": -33.3017,
              "longitude": -66.3378
            },
            "zoom": 5,
            "options": {
              "minZoom": 3,
              "scrollwheel": true
            },
            "markers": []
          };
        } else if (vm.selectZone.id == 3) {
          vm.widget10.map = {
            "center": {
              "latitude": -29.1846,
              "longitude": -58.0736
            },
            "zoom": 5,
            "options": {
              "minZoom": 3,
              "scrollwheel": true
            },
            "markers": []
          };
        } else if (vm.selectZone.id == 4) {
          vm.widget10.map = {
            "center": {
              "latitude": -25.1173,
              "longitude": -64.1247
            },
            "zoom": 5,
            "options": {
              "minZoom": 3,
              "scrollwheel": true
            },
            "markers": []
          };
        } else if (vm.selectZone.id == 5) {
          vm.widget10.map = {
            "center": {
              "latitude": -43.8840,
              "longitude": -68.4121
            },
            "zoom": 4,
            "options": {
              "minZoom": 3,
              "scrollwheel": true
            },
            "markers": []
          };
        }
        refreshGoogleMaps();
        vm.googleInterval = $interval(function () {
          refreshGoogleMaps();
        }, 60000);

        // Cleanup
        $scope.$on('$destroy', function () {
          $interval.cancel(vm.googleInterval);
        });
      });
    }
    setGoogleMaps();



    /*uiGmapGoogleMapApi.then(function ()
    {
      vm.widget10.map = {
        "center": {
          "latitude": 48.4061246,
          "longitude": -30.2047679
        },
        "zoom": 3,
        "options": {
          "minZoom": 3,
          "scrollwheel": false
        },
        "markers": []
      };
    });*/





    // Widget 11
    vm.widget11 = {
      title    : "Top de Técnicos",
      dtOptions: {
        dom       : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        pageLength: 10,
        lengthMenu: [10, 20, 50, 100],
        order: [[ 0, "desc" ]],
        autoWidth : false,
        responsive: true,
        columnDefs: [
          {
            width  : '5%',
            targets: [0, 1]
          },
          {
            // Target the quantity column
            targets: 0,
            render : function (data, type)
            {
              if ( type === 'display' )
              {
                if ( parseFloat(data) <= 2.5 )
                {
                  return '<div class="quantity-indicator md-red-500-bg"></div><div>' + data + '</div>';
                }
                else if ( parseFloat(data) > 2.5 && parseFloat(data) <= 3.5 )
                {
                  return '<div class="quantity-indicator md-amber-500-bg"></div><div>' + data + '</div>';
                }
                else
                {
                  return '<div class="quantity-indicator md-green-600-bg"></div><div>' + data + '</div>';
                }
              }

              return data;
            }
          }
        ]
      }
    };

    function getTecnicos(){
      api.getTopTecnicosByZone(vm.selectedZone.nombre).then(
        function (response) {
          vm.tecnicos=[];
          vm.tecnicos = response.data;
        }, function (error) {
          alert("ERROR");
        });
    }
    getTecnicos();

    // Widget 12
    vm.widget12 = {
      title    : "Top Likes de Facebook",
      dtOptions: {
        dom       : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        pageLength: 10,
        lengthMenu: [10, 20, 50, 100],
        autoWidth : false,
        responsive: true,
        order: [[ 0, "desc" ]],
        columnDefs: [
          {
            width  : '5%',
            targets: [0 ]
          }
        ],
        columns   : [
          {},
          {},
          {},
          {},
          {}
        ]
      }
    };

    function getLikes(){
      api.getTopLikesByZone(vm.selectedZone.nombre).then(
        function (response) {
          vm.likes=[];
          vm.likes = response.data;
        }, function (error) {
          alert("ERROR");
        });
    }
    getLikes();



    // Widget 13
    vm.widget13 = {
      title    : "Top Clientes que más reclaman",
      dtOptions: {
        dom       : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        pageLength: 10,
        lengthMenu: [10, 20, 50, 100],
        autoWidth : false,
        responsive: true,
        order: [[ 0, "desc" ]],
        columnDefs: [
          {
            width  : '5%',
            targets: [0, 1]
          }
        ],
        columns   : [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        ]
      }
    };

    function getTopUsuariosReclamanByZone(){
      api.getTopUsuariosReclamanByZone(vm.selectedZone.nombre).then(
        function (response) {
          vm.usuariosReclaman=[];
          vm.usuariosReclaman = response.data;
        }, function (error) {
          alert("ERROR");
        });
    }
    getTopUsuariosReclamanByZone();




    // Widget 1
    vm.widget1 = {
      title: "Reclamos",
      value: "0",
      footnote: "",
      detail: "Cantidad de reclamos sin solucionar (en estado abierto o en curso).",
      init: function () {
        // Run this function once to initialize the widget
        $interval.cancel(vm.reclamosTickerInterval);
        vm.widget1.cantidadClientes = "-";
        vm.widget1.value = null;
        vm.widget2.value = null;
        vm.widget3.velocidad = null;
        vm.widget4.promedio = null;
        vm.widget4.porcentaje = null;
        vm.widget1.porcentaje = null;
        vm.widget2.porcentaje = null;
        vm.widget6.cantidadClientes = null;
        vm.widget7.edadPromedio = null;
        vm.widget8.dispositivos = null;


        function reclamosTicker() {
          getOTsPerDay(); //init widget 5
          vm.widget6.init();
          // Increase the x value
          api.getReclamosActivos(vm.selectedZone.nombre).then(
            function (response) {

              vm.widget1.value = response.data.reclamos;
              vm.widget1.cantidadClientes = response.data.cantidadClientes;
              vm.widget1.porcentaje = (response.data.reclamos * 100.0) / response.data.cantidadClientes;
              vm.widget2.value = response.data.solicitudes;
              vm.widget2.porcentaje = (response.data.solicitudes * 100.0) / response.data.cantidadClientes;
              vm.widget3.velocidad = response.data.velocidad;

              vm.widget4.promedio = response.data.promedio;
              vm.widget4.porcentaje = (response.data.promedio * 100.0) / 5.0;

              vm.widget6.cantidadClientes = response.data.cantidadClientes;
              vm.widget7.edadPromedio = response.data.edadPromedio;
              vm.widget8.dispositivos = response.data.dispositivos;
              vm.showProgrees = false;
            }, function (error) {
              alert("ERROR");
            });

        }

        // Set interval
        vm.reclamosTickerInterval = $interval(function () {
          reclamosTicker();
        }, 3000);

        // Cleanup
        $scope.$on('$destroy', function () {
          $interval.cancel(vm.reclamosTickerInterval);
        });
      }
    };
    vm.widget1.init();


  }
})();
