angular.module('mean.system')
  .factory('userSearch', ['$http', '$q', ($http, $q) => ({
    search: (selectedUser) => {
      const deffered = $q.defer();
      // if (selectedUser !== '') {
      $http.get(`http://localhost:3000/api/search/users/${selectedUser}`)
        .then((response) => {
          // console.log(response.data);
          deffered.resolve({ data: response.data });
        }, (response) => {
          deffered.reject(response);
          // console.log('error occurred');
        });
      return deffered.promise;
      // }
    },

    sendInvite: (mailObject) => {
      const deffered = $q.defer();
      // if (selectedUser !== '') {
      console.log(mailObject.Link);
      $http.post('http://localhost:3000/api/users/emailInvite', {
        To: mailObject.To,
        Link: mailObject.Link
      })
        .then((response) => {
          // console.log(response.data);
          deffered.resolve({ data: response.data });
        }, (response) => {
          deffered.reject(response);
          // console.log('error occurred');
        });
      return deffered.promise;
      // }
    }

  }
  )]);
