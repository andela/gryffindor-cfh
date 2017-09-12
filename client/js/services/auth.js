/* global angular */
angular.module('mean.system')
  .factory('AuthService', ['$http', 'LocalStorageService',
    ($http, LocalStorageService) => ({
      login(email, password) { return $http.post('/api/auth/login', { email, password }); },
      signUp(username, email, password) { return $http.post('/api/auth/signup', { username, email, password }); },
      isAuthenticated() { return LocalStorageService.getToken(); },
      saveToken(theToken) { return LocalStorageService.setToken(theToken); }
    })]);
