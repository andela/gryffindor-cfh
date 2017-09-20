angular.module('mean.components')
  .component('leaderBoard', {
    templateUrl: '/views/leaderBoard.html',
    controller: leaderBoardCtrl,
    controllerAs: '$leaderCtrl'
  });

leaderBoardCtrl.$inject = ['dashboard'];

/**
 * Leader Board controller
 * @param {any} dashboard service that serves the components in dashboard
* @return {void}
 */
function leaderBoardCtrl(dashboard) {
  const vm = this;
  vm.$onInit = () => {
    vm.leaderBoard = [];
    vm.fetchLeaderBoard();
  };
  vm.fetchLeaderBoard = () => {
    dashboard.fetchLeaderBoard()
      .then((response) => {
        vm.leaderBoard = response.data;
      })
      .catch(error => (error));
  };
}
