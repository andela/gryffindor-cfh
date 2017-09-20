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

        $scope.getRequests = () => {
          const user = TokenService.getUser();
          const userObject = JSON.parse(user);
          const { email } = userObject;
          userSearch.getRequests(email)
            .then((data) => {
              $scope.friendRequests = data.data;
              $scope.friendNotifications = data.data.length;
            })
            .catch(error => (error));
        };

        $scope.showError = () => $scope.errorMessage !== '';
        $scope.avatars = [];
        AvatarService.getAvatars()
          .then((data) => {
            $scope.avatars = data;
          });
      }]);
