/* global angular */
angular.module('mean.system')
  .controller('IndexController', ['$scope', 'Global', '$location', 'socket', 'game', 'AvatarService', 'AuthService',
    'LocalStorageService', 'userSearch',
    ($scope, Global, $location, socket, game, AvatarService, AuthService,
      TokenService, userSearch) => {
      $scope.global = Global;
      $scope.email = '';
      $scope.username = '';
      $scope.password = '';
      $scope.errorMessage = '';
      $scope.dashboardNotifications = 0;

      $scope.showOptions = () => !AuthService.isAuthenticated();

      $scope.showNotification = () => $scope.dashboardNotifications > 0;

      $scope.signOut = () => {
        TokenService.clearToken();
        TokenService.clearUser();
        $location.path('#!/');
      };

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
              TokenService.saveUser(user);  // eslint-disable-line
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
              TokenService.saveUser(user);  // eslint-disable-line
              $location.path('/#!');
            })
            .catch(({ data: { message } }) => {
              $scope.errorMessage = message;
            });
        } else {
          $scope.errorMessage = 'Please fill all fields appropriately';
        }
      };

      const incrementNotifications = () => {
        $scope.dashboardNotifications += 1;
      };

      const user = TokenService.getUser();
      if (user) {
        const userObject = JSON.parse(user);
        const { email, _id } = userObject;
        userSearch.getRequests(_id)
          .then((data) => {
            $scope.dashboardNotifications += data.data.length;
          })
          .catch(error => (error));
        game.getRequests(email, incrementNotifications);
      }

      $scope.showError = () => $scope.errorMessage !== '';
      $scope.avatars = [];
      AvatarService.getAvatars()
        .then((data) => {
          $scope.avatars = data;
        });
    }]);

