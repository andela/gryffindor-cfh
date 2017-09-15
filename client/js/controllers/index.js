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
      $scope.friendRequests = [];
      $scope.gameRequests = [];
      $scope.resolvedFriendRequests = [];
      $scope.friendNotifications = 0;

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

      const email = TokenService.getEmail();
      const myUsername = TokenService.getUsername();

      $scope.resolveFriendRequest = (inviterEmail, username, status) => {
        $scope.resolvedFriendRequests.push(inviterEmail);
        game.resolveFriendRequest(inviterEmail, username, email, myUsername, status);
      };

      $scope.checkRequestResolved = requestEmail => (
        $scope.resolvedFriendRequests.indexOf(requestEmail) !== -1
      );

      const incrementNotifications = ({ inviter, inviterEmail }) => {
        $scope.friendNotifications += 1;
        $scope.friendRequests.push({ username: inviter, email: inviterEmail });
      };

      const incrementGameRequests = ({ username, link }) => {
        $scope.friendNotifications += 1;
        $scope.gameRequests.push({ username, link });
      };

      $scope.getRequests = () => {
        userSearch.getRequests(email)
          .then((data) => {
            $scope.friendRequests = data.data;
            $scope.friendNotifications = data.data.length;
          })
          .catch(error => (error));
      };

      game.getRequests(email, incrementNotifications);
      game.getGameRequests(email, incrementGameRequests);

      $scope.showError = () => $scope.errorMessage !== '';
      $scope.avatars = [];
      AvatarService.getAvatars()
        .then((data) => {
          $scope.avatars = data;
        });
    }]);
