angular.module('mean.system')
  .factory('dashboard', ['$http', $http => ({
    fetchRecords() {
      return $http.get('/api/games/history');
    },
    fetchLeaderBoard() {
      return $http.get('/api/leaderboard');
    },
    fetchDonations() {
      return $http.get('/api/donations');
    }
  }
  )]);
