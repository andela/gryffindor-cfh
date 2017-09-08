/* global angular */
angular.module('mean.system')
  .controller('IndexController',
    ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'AuthenticationService',
      'LocationStorageService',
      ($scope, Global, $location, socket, game, AvatarService, AuthenticationService,
        LocationStorageService) => { //eslint-disable-line
        $scope.global = Global;
        $scope.email = '';
        $scope.username = '';
        $scope.password = '';

        $scope.login = (isValid) => {
          if (isValid) {
            AuthenticationService.login($scope.email, $scope.password)
              .then(() => {
                $location.path('/#!');
              })
              .catch(() => {
                // TODO: INSERT ERROR FEEDBACK FOR USER
              });
          }
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

