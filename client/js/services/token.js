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
<<<<<<< HEAD
    saveUser: user => (
      $window.localStorage.setItem('user', JSON.stringify(user))
=======
<<<<<<< HEAD
    saveEmail: email => (
      $window.localStorage.setItem('email', email)
>>>>>>> Chore/151116421/add auth middleware (#46)
    ),
    getUser: () => (
      $window.localStorage.getItem('user')
    ),
<<<<<<< HEAD
    clearUser: () => {
      $window.localStorage.removeItem('user');
=======
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
=======
    saveUser: user => (
      $window.localStorage.setItem('user', JSON.stringify(user))
    ),
    getUser: () => (
      $window.localStorage.getItem('user')
    ),
    clearUser: () => {
      $window.localStorage.removeItem('user');
>>>>>>> Chore/151116421/add auth middleware (#46)
>>>>>>> Chore/151116421/add auth middleware (#46)
    }
  })
  ]);
