

/* global angular */
angular.module('mean.system').factory('LocalStorageService', ['$window', function ($window) {
  return {
    setToken: function setToken(myToken) {
      return $window.localStorage.setItem('token', myToken);
    },
    getToken: function getToken() {
      return $window.localStorage.getItem('token');
    },
    clearToken: function clearToken() {
      $window.localStorage.removeItem('token');
    },
    saveUser: function saveUser(user) {
      $window.localStorage.setItem('user', user);
    },
    clearUser: function clearUser() {
      $window.localStorage.removeItem('user');
    }
  };
}]);
