/* global angular */
angular.module('mean.system')
  .controller('IndexController',
    ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'AuthenticationService',
      ($scope, Global, $location, socket, game, AvatarService, AuthenticationService) => {
        $scope.global = Global;
        $scope.email = '';
        $scope.password = '';

        $scope.login = (isValid) => {
          if (isValid) {
            AuthenticationService.login($scope.email, $scope.password);
          } else {
            console.log('form is not valid');
          }
        };

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

        $scope.avatars = [];
        AvatarService.getAvatars()
          .then((data) => {
            $scope.avatars = data;
          });
      }]);
