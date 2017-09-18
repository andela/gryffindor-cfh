angular.module('mean.system')
  .factory('tokenInjector', ['$window',
    ($window) => {
      const tokenInjector = {
        request: (config) => {
          config.headers.token = $window.localStorage.getItem('token');
          return config;
        }
      };
      return tokenInjector;
    }]);

angular.module('mean.system')
  .config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push('tokenInjector');
  }]);
