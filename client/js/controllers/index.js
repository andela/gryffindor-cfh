/* global angular */
angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'AuthService',
    'LocalStorageService',
    ($scope, Global, $location, socket, game, AvatarService, AuthService,
      TokenService) => {
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

      $scope.showOptions = () => !AuthService.isAuthenticated();

      $scope.signOut = () => {
        TokenService.clearToken();
        TokenService.clearUser();
        TokenService.clearUserId();
        $location.path('#!/');
      };

      $scope.login = (isValid) => {
        if (isValid) {
          AuthService.login($scope.email, $scope.password)
            .then(({ data: { token, user } }) => {
              AuthService.saveToken(token);
<<<<<<< HEAD
              TokenService.saveUser(user);  // eslint-disable-line
=======
              TokenService.saveUser(user);
              TokenService.saveUserId(user._id);  // eslint-disable-line
>>>>>>> bug/fix-authenticated
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
<<<<<<< HEAD
              TokenService.saveUser(user);  // eslint-disable-line
=======
              TokenService.saveUser(user);
              TokenService.saveUserId(user._id);   // eslint-disable-line
>>>>>>> bug/fix-authenticated
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

