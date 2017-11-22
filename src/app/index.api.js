 (function ()
{
    'use strict';

    angular
        .module('fuse')
        .factory('api', apiService);

    /** @ngInject */
    function apiService($resource, $http, $q, $localStorage)
    {
        /**
         * You can use this service to define your API urls. The "api" service
         * is designed to work in parallel with "apiResolver" service which you can
         * find in the "app/core/services/api-resolver.service.js" file.
         *
         * You can structure your API urls whatever the way you want to structure them.
         * You can either use very simple definitions, or you can use multi-dimensional
         * objects.
         *
         * Here's a very simple API url definition example:
         *
         *      api.getBlogList = $resource('http://api.example.com/getBlogList');
         *
         * While this is a perfectly valid $resource definition, most of the time you will
         * find yourself in a more complex situation where you want url parameters:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'});
         *
         * You can also define your custom methods. Custom method definitions allow you to
         * add hardcoded parameters to your API calls that you want to sent every time you
         * make that API call:
         *
         *      api.getBlogById = $resource('http://api.example.com/blog/:id', {id: '@id'}, {
         *         'getFromHomeCategory' : {method: 'GET', params: {blogCategory: 'home'}}
         *      });
         *
         * In addition to these definitions, you can also create multi-dimensional objects.
         * They are nothing to do with the $resource object, it's just a more convenient
         * way that we have created for you to packing your related API urls together:
         *
         *      api.blog = {
         *                   list     : $resource('http://api.example.com/blog'),
         *                   getById  : $resource('http://api.example.com/blog/:id', {id: '@id'}),
         *                   getByDate: $resource('http://api.example.com/blog/:date', {id: '@date'}, {
         *                       get: {
         *                            method: 'GET',
         *                            params: {
         *                                getByDate: true
         *                            }
         *                       }
         *                   })
         *       }
         *
         * If you look at the last example from above, we overrode the 'get' method to put a
         * hardcoded parameter. Now every time we make the "getByDate" call, the {getByDate: true}
         * object will also be sent along with whatever data we are sending.
         *
         * All the above methods are using standard $resource service. You can learn more about
         * it at: https://docs.angularjs.org/api/ngResource/service/$resource
         *
         * -----
         *
         * After you defined your API urls, you can use them in Controllers, Services and even
         * in the UIRouter state definitions.
         *
         * If we use the last example from above, you can do an API call in your Controllers and
         * Services like this:
         *
         *      function MyController (api)
         *      {
         *          // Get the blog list
         *          api.blog.list.get({},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the id of 3
         *          var id = 3;
         *          api.blog.getById.get({'id': id},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *
         *          // Get the blog with the date by using custom defined method
         *          var date = 112314232132;
         *          api.blog.getByDate.get({'date': date},
         *
         *              // Success
         *              function (response)
         *              {
         *                  console.log(response);
         *              },
         *
         *              // Error
         *              function (response)
         *              {
         *                  console.error(response);
         *              }
         *          );
         *      }
         *
         * Because we are directly using $resource service, all your API calls will return a
         * $promise object.
         *
         * --
         *
         * If you want to do the same calls in your UI Router state definitions, you need to use
         * "apiResolver" service we have prepared for you:
         *
         *      $stateProvider.state('app.blog', {
         *          url      : '/blog',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver)
         *              {
         *                  return apiResolver.resolve('blog.list@get');
         *              }
         *          }
         *      });
         *
         *  You can even use parameters with apiResolver service:
         *
         *      $stateProvider.state('app.blog.show', {
         *          url      : '/blog/:id',
         *          views    : {
         *               'content@app': {
         *                   templateUrl: 'app/main/apps/blog/blog.html',
         *                   controller : 'BlogController as vm'
         *               }
         *          },
         *          resolve  : {
         *              Blog: function (apiResolver, $stateParams)
         *              {
         *                  return apiResolver.resolve('blog.getById@get', {'id': $stateParams.id);
         *              }
         *          }
         *      });
         *
         *  And the "Blog" object will be available in your BlogController:
         *
         *      function BlogController(Blog)
         *      {
         *          var vm = this;
         *
         *          // Data
         *          vm.blog = Blog;
         *
         *          ...
         *      }
         */

        var api = {
          loginAndGetToken:loginAndGetToken,
          getTipoUsuario:getTipoUsuario,
          getTecnicos:getTecnicos,
          getClientes:getClientes,
          getTiposOT:getTiposOT,
          getOTs:getOTs,
          getOt:getOt,
          getOSs:getOSs,
          getOs:getOs,
          getAlerta:getAlerta,
          getNotificacion:getNotificacion,
          getAlertas:getAlertas,
          getLocalidades:getLocalidades,
          notificacionesZona:notificacionesZona,
          guardarOT:guardarOT,
          guardarOTEditada:guardarOTEditada,
          guardarEstadoOT:guardarEstadoOT,
          guardarEstadoOS:guardarEstadoOS,
          getPromociones:getPromociones,
          getReclamosActivos:getReclamosActivos,
          getVelocidadPromedio:getVelocidadPromedio,
          getCalificacionPromedio:getCalificacionPromedio,
          getVelocidadesContratadas:getVelocidadesContratadas,
          getOTsPerDay:getOTsPerDay,
          getCantidadDeClientes:getCantidadDeClientes,
          getZonasEnProblemas:getZonasEnProblemas,
          getTopTecnicosByZone:getTopTecnicosByZone,
          getTopLikesByZone:getTopLikesByZone,
          getTopUsuariosReclamanByZone:getTopUsuariosReclamanByZone,
          getSolicitudesActivas:getSolicitudesActivas
        };

        // Base Url
        //api.baseUrl = 'app/data/';
        api.baseUrl = 'http://200.82.0.24';

        // api.sample = $resource(api.baseUrl + 'sample/sample.json');

        return api;

      function loginAndGetToken(client) {
        var deferred = $q.defer();
        var header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        var data = "grant_type=password&UserName=" + client.userName + "&Password=" + client.password + "&client_id=Utn.Ba$";
        var url = api.baseUrl + '/oauth2/token';
        console.log(url);
        $http.post(url, data, header)
          .then(function (response) {

            console.log(response);
            deferred.resolve(response);

          }).catch(function (err, status) {
            //_logOut();
            alert("ERRRR /token");
            deferred.reject(err);
          });
        return deferred.promise;
      }

      function getTipoUsuario(client) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/tipoUsuarioApp?username=' + client)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function notificacionesZona(notificacion) {
        var deferred = $q.defer();

        $http.post(api.baseUrl + '/api/notificaciones_zona' , notificacion)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function guardarOT(ot) {
        var deferred = $q.defer();

        $http.post(api.baseUrl + '/api/ot' , ot)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function guardarOTEditada(ot) {
        var deferred = $q.defer();

        $http.post(api.baseUrl + '/api/ot_edit_Tecnico' , ot)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function guardarEstadoOT(ot) {
        var deferred = $q.defer();

        $http.post(api.baseUrl + '/api/ot_status' , ot)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function guardarEstadoOS(os) {
        var deferred = $q.defer();

        $http.post(api.baseUrl + '/api/os_status' , os)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getTecnicos() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Tecnicos')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getClientes() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_clientes')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getTiposOT() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/tipo_ot')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getOTs() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Ots')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getOSs() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Oss')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getOt(id) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Ot?id=' + id)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getOs(id) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Os?id=' + id)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getNotificacion(id) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Notificacion?id=' + id)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getAlerta(id) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Alerta?id=' + id)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getReclamosActivos(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Stats?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getSolicitudesActivas(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Stats?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getVelocidadPromedio(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Stats?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getCalificacionPromedio(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Stats?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getVelocidadesContratadas(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Velocidades_Contratadas?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }


      function getOTsPerDay(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_OTs_x_Dia?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getCantidadDeClientes(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Stats?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getZonasEnProblemas(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Zonas_Problemas')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getDispositivosConectados(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Stats?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getEdadPromedio(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Stats?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getTopTecnicosByZone(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_TopTecnicos?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getTopLikesByZone(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Top_Paginas?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getTopUsuariosReclamanByZone(zona) {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Top_Clientes?id=' + zona)
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getAlertas() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_AlertasProm?id=Alerta')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getLocalidades() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/localidad')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }

      function getPromociones() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_AlertasProm?id=Promocion')
          .then(function (data, status, headers) {
            deferred.resolve(data);
          })
          .catch(function (data) {
            deferred.reject(data);
          });

        return deferred.promise;
      }
    }

})();
