/* global angular */
angular.module('mean.system')
  .factory('AuthenticationService', ['$http',
    $http => ({
      login(userEmail, userPassword) { return $http.post('/api/auth/login', { userEmail, userPassword }); },
      signUp(userName, userEmail, userPassword) { return $http.post('/api/auth/signup', userName, userEmail, userPassword); }
    })]);
