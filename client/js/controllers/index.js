/* global angular */
angular.module('mean.system')
  .controller('IndexController',
    ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'AuthService',
      'LocalStorageService',
    ($scope, Global, $location, socket, game, AvatarService, AuthService, TokenService) => { //eslint-disable-line
        $scope.global = Global;
        $scope.email = '';
        $scope.username = '';
        $scope.password = '';

        $scope.showOptions = () => !AuthService.isAuthenticated();

        $scope.signOut = () => {
          TokenService.clearToken();
          TokenService.clearUser();
          $location.path('#!/');
        };

        $scope.login = (isValid) => {
          if (isValid) {
            AuthService.login($scope.email, $scope.password)
              .then(({ data: { token, user } }) => {
                console.log(token, '==> this is the token');
                AuthService.saveToken(token);
                console.log(user);
                TokenService.saveUser(user);
                $location.path('/#!');
              })
              .catch(() => {
              // TODO: INSERT ERROR FEEDBACK FOR USER
              });
          }
        };
        $scope.signUp = (isValid) => {
          if (isValid) {
            AuthService.signUp($scope.username, $scope.email, $scope.password)
              .then(({ data: { token, user } }) => {
                AuthService.saveToken(token);
                TokenService.saveUser(user);
                $location.path('/#!');
              })
              .catch(() => {
              // TODO: handler sign up error
              });
          }
        };
        $scope.avatars = [];
        AvatarService.getAvatars()
          .then((data) => {
            $scope.avatars = data;
          });
      }]);

