/* global angular */
angular.module('mean.system')
  .factory('AuthService', ['$http', 'LocalStorageService',
    ($http, LocalStorageService) => ({
      login(email, password) { return $http.post('/api/auth/login', { email, password }); },
      signUp(name, email, password) { return $http.post('/api/auth/signup', { name, email, password }); },
      isAuthenticated() { return LocalStorageService.getToken(); },
      saveToken(theToken) { return LocalStorageService.setToken(theToken); }
    })]);
