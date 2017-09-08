/* global angular */
angular
  .module('mean.system')
  .factory('LocalStorageService', ['$window', $window => ({
    setToken: myToken => (
      $window.localStorage.setItem('token', myToken)
    ),
    getToken: () => (
      $window.localStorage.getItem('token')
    ),
    clearToken: () => {
      $window.localStorage.removeItem('token');
    },
    saveUser: (user) => {
      $window.localStorage.setItem('user', user);
    },
    clearUser: () => {
      $window.localStorage.removeItem('user');
    }
  })
  ]);
