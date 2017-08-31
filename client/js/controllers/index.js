angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService',
    'LocationStorageService',
    ($scope, Global, $location, socket, game, AvatarService, LocationStorageService) => {
      $scope.global = Global;
      $scope.email = '';
      $scope.username = '';
      $scope.password = '';

      $scope.playAsGuest = () => {
        game.joinGame();
        $location.path('/app');
      };
      $scope.showError = () => {
        if ($location.search().error) {
          return $location.search().error;
        }
        return false;
      };
      $scope.signUp = () => {
        // AuthenticationService.signUp($scope.userName, $scope.email, $scope.password);
      };

      $scope.avatars = [];
      AvatarService.getAvatars()
        .then((data) => {
          $scope.avatars = data;
        });
    }]);

