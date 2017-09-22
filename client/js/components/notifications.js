angular.module('mean.components')
  .component('notificationBox', {
    templateUrl: '/views/notifications.html',
    controller: ['$scope', 'game', 'LocalStorageService', 'userSearch',
      function notificationsController($scope, game, TokenService, userSearch) {
        $scope.friendRequests = [];
        $scope.gameRequests = [];
        $scope.friendNotifications = 0;
        $scope.gameNotifications = 0;
        $scope.notifications = $scope.friendNotifications + $scope.gameNotifications;

        $scope.game = game;

        const friendRequestError = (payload) => {
          const errorEmail = payload.email;
          const index = $scope.resolvedFriendRequests.indexOf(errorEmail);
          $scope.resolvedFriendRequests.splice(index, 1);
        };

        $scope.resolveFriendRequest = (inviterEmail, username, status, indexOfInvite) => {
          const user = TokenService.getUser();
          const userObject = JSON.parse(user);
          const { email, name } = userObject;
          $scope.friendRequests.splice(indexOfInvite, 1);
          $scope.friendNotifications += -1;
          $scope.game
            .resolveFriendRequest(inviterEmail, username, email, name, status, friendRequestError);
        };


        $scope.checkRequestResolved = requestEmail => (
          $scope.resolvedFriendRequests.indexOf(requestEmail) !== -1
        );

        $scope.incrementNotifications = ({ username, email }) => {
          $scope.friendNotifications += 1;
          $scope.friendRequests.push({ username, email });
        };

        $scope.incrementGameRequests = ({ inviter, inviteLink }) => {
          $scope.friendNotifications += 1;
          $scope.gameRequests.push({ inviter, inviteLink });
        };

        $scope.getRequests = () => {
          const user = TokenService.getUser();
          const userObject = JSON.parse(user) || {};
          const { _id } = userObject;
          userSearch.getRequests(_id)
            .then((data) => {
              $scope.friendRequests = data.data;
              $scope.friendNotifications += data.data.length;
            })
            .catch(error => (error));
        };

        if (TokenService.getUser()) {
          $scope.getRequests();
        }
        if (TokenService.getUser()) {
          const user = TokenService.getUser();
          const userObject = JSON.parse(user) || {};
          const { email } = userObject;
          game.getRequests(email, $scope.incrementNotifications);
          game.getGameRequests(email, $scope.incrementGameRequests);
        }
      }]
  });
