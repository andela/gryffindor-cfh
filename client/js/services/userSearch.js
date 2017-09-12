angular.module('mean.system')
<<<<<<< HEAD
  .factory('userSearch', ['$http', '$q', ($http, $q) => ({
    search(selectedUser) {
      const deffered = $q.defer();
      $http.get(`/api/search/users/${selectedUser}`)
        .then((response) => {
          deffered.resolve({ data: response.data });
        }, (response) => {
          deffered.reject(response);
        });
      return deffered.promise;
    },

    sendInvite: (mailObject) => {
      const deffered = $q.defer();
      $http.post('/api/users/emailInvite', {
        To: mailObject.To,
        Link: mailObject.Link
      })
        .then((response) => {
          deffered.resolve({ data: response.data });
        }, (response) => {
          deffered.reject(response);
        });
      return deffered.promise;
=======
  .factory('userSearch', ['$http', $http => ({
    search(selectedUser) {
      return $http.get(`/api/search/users/${selectedUser}`);
    },

    sendInvite(mailObject) {
      return $http.post('/api/users/emailInvite', {
        To: mailObject.To,
        Link: mailObject.Link
      });
>>>>>>> b75f726854b8eaf92e42e06717b63b210a16e702
    }

  }
  )]);
