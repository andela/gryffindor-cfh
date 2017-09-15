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
        $scope.friendRequests = [];
        $scope.gameRequests = [];
        $scope.resolvedFriendRequests = [];
        $scope.friendNotifications = 0;

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
              .catch(() => {
              // TODO: INSERT ERROR FEEDBACK FOR USER
              });
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
              .catch(() => {
              // TODO: handler sign up error
              });
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
        $scope.avatars = [];
        AvatarService.getAvatars()
          .then((data) => {
            $scope.avatars = data;
          });
      }]);

