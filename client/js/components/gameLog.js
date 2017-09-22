angular.module('mean.components')
  .component('gameLog', {
    templateUrl: '/views/gameLog.html',
    controller: gameLogController,
    controllerAs: '$ctrl'
  });

gameLogController.$inject = ['dashboard'];

/**
 * Game log controller
 * @param {any} dashboard service that serves the components in dashboard
* @return {void}
 */
function gameLogController(dashboard) {
  const vm = this;
  vm.$onInit = () => {
    vm.records = [];
    vm.fetchRecords();
  };
  vm.fetchRecords = () => {
    dashboard.fetchRecords()
      .then((response) => {
        vm.records = response.data;
      })
      .catch(error => (error));
  };
}

