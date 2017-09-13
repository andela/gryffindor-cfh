/* global angular */
angular.module('mean.system')
  .controller('IndexController',
    ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'AuthService',
      'LocalStorageService', 'userSearch',
    ($scope, Global, $location, socket, game, AvatarService, AuthService, TokenService, userSearch) => { //eslint-disable-line
        $scope.global = Global;
        $scope.email = '';
        $scope.username = '';
        $scope.password = '';
        $scope.errorMessage = '';

        $scope.showOptions = () => !AuthService.isAuthenticated();

        $scope.signOut = () => {
          TokenService.clearToken();
          TokenService.clearUsername();
          TokenService.clearEmail();
          $location.path('#!/');
        };

        $scope.login = (isValid) => {
          if (isValid) {
            AuthService.login($scope.email, $scope.password)
              .then(({ data: { token, user } }) => {
                const { username, email } = user;
                AuthService.saveToken(token);
                TokenService.saveUsername(username);
                TokenService.saveEmail(email);
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
                const { username, email } = user;
                AuthService.saveToken(token);
                TokenService.saveUsername(username);
                TokenService.saveEmail(email);
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

