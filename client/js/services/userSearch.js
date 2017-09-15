angular.module('mean.system')
  .factory('userSearch', ['$http', $http => ({
    search(selectedUser) {
      return $http.get(`/api/search/users/${selectedUser}`);
    },

    sendInvite(mailObject) {
      return $http.post('/api/users/emailInvite', {
        To: mailObject.To,
        Link: mailObject.Link
      });
    },

    getFriends(email) {
      return $http.post('/api/auth/friends', {
        email
      });
    },

    getRequests(email) {
      return $http.post('/api/auth/requests', {
        email
      });
    }
  }
  )]);
