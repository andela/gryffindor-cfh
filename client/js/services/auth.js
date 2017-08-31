/* global angular */
angular.module('mean.system')
  .factory('AuthenticationService', ['$http', $http => ({
    login: (userEmail, userPassword) => {
      $http.post('/api/auth/login', {
        email: userEmail,
        password: userPassword
      })
        .then((result) => {
          console.log(result); // eslint-disable-line
        }, (error) => {
          console.log(error); // eslint-disable-line
        });
    },
    signUp: (userName, userEmail, userPassword) => {
      $http.post('/api/auth/signup', {
        name: userName,
        email: userEmail,
        password: userPassword
      })
        .then((result) => {
          console.log(result);  // eslint-disable-line
        }, (error) => {
          console.log(error); // eslint-disable-line
        });
    }
  }
  )]);
