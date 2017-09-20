angular.module('mean.components')
  .component('notificationBox', {
    templateUrl: '/views/notifications.html',
    controller: ['$scope', 'game', 'LocalStorageService', 'userSearch',
      function notificationsController($scope, game, TokenService, userSearch) {
        $scope.friendRequests = [];
        $scope.gameRequests = [];
        $scope.resolvedFriendRequests = [];
        $scope.friendNotifications = 0;
        $scope.gameNotifications = 0;
        $scope.testNumber = 4;
        $scope.notifications = $scope.friendNotifications + $scope.gameNotifications;

        const user = TokenService.getUser();
        const userObject = JSON.parse(user);
        const { email, name, _id } = userObject;
        $scope.game = game;

        const friendRequestError = (payload) => {
          const errorEmail = payload.email;
          const index = $scope.resolvedFriendRequests.indexOf(errorEmail);
          $scope.resolvedFriendRequests.splice(index, 1);
        };

        $scope.resolveFriendRequest = (inviterEmail, username, status) => {
          $scope.resolvedFriendRequests.push(inviterEmail);
          $scope.game
            .resolveFriendRequest(inviterEmail, username, email, name, status, friendRequestError);
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
          userSearch.getRequests(_id)
            .then((data) => {
              $scope.friendRequests = data.data;
              $scope.friendNotifications += data.data.length;
            })
            .catch(error => (error));
        };

        $scope.getRequests();

        $scope.game.getRequests(email, incrementNotifications);
        $scope.game.getGameRequests(email, incrementGameRequests);
      }]
  });
