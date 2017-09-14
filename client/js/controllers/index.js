/* global angular */
angular.module('mean.system')
  .controller('IndexController',
    ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'AuthService',
      'LocalStorageService', '$window',
    ($scope, Global, $location, socket, game, AvatarService, AuthService, TokenService, $window) => { //eslint-disable-line
        $scope.global = Global;
        $scope.email = '';
        $scope.username = '';
        $scope.password = '';
        $scope.errorMessage = '';

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
                AuthService.saveToken(token);
                TokenService.saveUser(user);
                $location.path('/#!');
              })
              .catch(({ data: { message } }) => {
                $scope.errorMessage = message;
              });
          } else {
            $scope.errorMessage = 'Please fill all fields';
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
              .catch(({ data: { message } }) => {
                $scope.errorMessage = message;
              });
          } else {
            $scope.errorMessage = 'Please fill all fields appropriately';
          }
        };
        $scope.showError = () => $scope.errorMessage !== '';
        $scope.avatars = [];
        AvatarService.getAvatars()
          .then((data) => {
            $scope.avatars = data;
          });
      }]);

