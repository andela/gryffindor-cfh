angular.module('mean.components')
  .component('donations', {
    templateUrl: '/views/donations.html',
    controller: donationsCtrl,
    controllerAs: '$donationsCtrl'
  });

donationsCtrl.$inject = ['dashboard'];


/**
 * Donations controller
 * @param {any} dashboard service that serves the components in dashboard
* @return {void}
 */
function donationsCtrl(dashboard) {
  const vm = this;
  vm.$onInit = () => {
    vm.donations = [];
    vm.fetchDonations();
  };
  vm.fetchDonations = () => {
    dashboard.fetchDonations()
      .then((response) => {
        vm.donations = response.data;
      })
      .catch(error => (error));
  };
}
