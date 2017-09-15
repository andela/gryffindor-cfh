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
    clearToken: () => (
      $window.localStorage.removeItem('token')
    ),
    saveEmail: email => (
      $window.localStorage.setItem('email', email)
    ),
    saveUsername: username => (
      $window.localStorage.setItem('username', username)
    ),
    getEmail: () => (
      $window.localStorage.getItem('email')
    ),
    getUsername: () => (
      $window.localStorage.getItem('username')
    ),
    clearEmail: () => (
      $window.localStorage.removeItem('email')
    ),
    clearUsername: () => {
      $window.localStorage.removeItem('username');
    }
  })
  ]);
