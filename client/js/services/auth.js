/* global angular */
angular.module('mean.system')
  .factory('AuthenticationService', ['$http',
    $http => ({
      login(email, password) { return $http.post('/api/auth/login', { email, password }); },
      signUp(username, email, password) { return $http.post('/api/auth/signup', { username, email, password }); }
    })]);
