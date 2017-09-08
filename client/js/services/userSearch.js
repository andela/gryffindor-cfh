angular.module('mean.system')
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
    }

  }
  )]);
