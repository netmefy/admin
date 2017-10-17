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
          getOTs:getOTs,
          getAlertas:getAlertas,
          getPromociones:getPromociones
        };

        // Base Url
        //api.baseUrl = 'app/data/';
        api.baseUrl = 'http://200.82.0.24';

        // api.sample = $resource(api.baseUrl + 'sample/sample.json');

        return api;

      function loginAndGetToken(client) {
        var data = "grant_type=password&UserName=" + client.userName + "&Password=" + client.password + "&client_id=Utn.Ba$";
        //alert("$scope.username:" + $scope.username);
        //alert(data);
        var url = api.baseUrl + '/oauth2/token';
        console.log(url);
        var deferred = $q.defer();
        $http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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

      function getAlertas() {
        var deferred = $q.defer();

        $http.get(api.baseUrl + '/api/ISP_Alertas')
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

        $http.get(api.baseUrl + '/api/ISP_Promociones')
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
