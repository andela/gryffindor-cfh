angular.module('mean.components', [])
  .component('selectRegion', {
    templateUrl: '/views/select-region.html',
    controller: ['$scope', 'socket', 'game', function regionController($scope, socket, game) {
      $scope.selectedRegion = '';
      $scope.setRegion = (index) => {
        console.log($scope.selectedRegion);
        if (index === 'default') {
          game.setRegion({});
        } else {
          const region = $scope.regions[$scope.selectedRegion];
          game.setRegion(region);
        }
        $('#regionModal').modal('hide');
      };
      $scope.enabled = () => $scope.selectedRegion !== '';
      game.fetchRegions().then(({ data }) => {
        $scope.regions = data;
      });
    }]
  });
