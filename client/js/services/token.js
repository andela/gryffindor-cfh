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
    ),
    getUser: () => (
      $window.localStorage.getItem('user')
    ),
    clearUser: () => {
      $window.localStorage.removeItem('user');
    }
=======
    saveUserId: userId => (
      $window.localStorage.setItem('userId', userId)
    ),
    getUserId: () => (
      $window.localStorage.getItem('userId')
    ),
    clearUserId: () => (
      $window.localStorage.removeItem('userId')
    ),
    saveUser: user => (
      $window.localStorage.setItem('user', user)
    ),
    clearUser: () => (
      $window.localStorage.removeItem('user')
    )
>>>>>>> bug/fix-authenticated
  })
  ]);
