/* global Firebase */
angular.module('mean.components', [])
  .component('chatBox', {
    templateUrl: '/views/chat.html',
    controller: ['$scope', 'game', '$firebaseArray',
      function ChatController($scope, game, $firebaseArray) {
        $scope.groupChat = '';
        $scope.game = game;
        $scope.notificationCount = 0;
        let chatRef;

        $scope.$watch('game.gameID', () => {
          if (game.gameID !== null) {
            chatRef = new Firebase(`https://cfhchat-3be15.firebaseio.com/messages/${game.gameID}`);
            $scope.groupChats = $firebaseArray(chatRef);

            $scope.groupChats.$watch((event) => {
              const insertedRecord = $scope.groupChats.$getRecord(event.key);
              if (insertedRecord !== null) {
                if (insertedRecord.postedBy !== game.players[game.playerIndex].username) {
                  $scope.notificationCount = 1;
                }
              }
              $scope.scrollChats();
            });
          }
        });

        $scope.scrollChats = () => {
          const element = document.getElementById('message-cont');
          if (element) {
            const timeout = setTimeout(() => {
              element.scrollTop = element.scrollHeight;
              clearTimeout(timeout);
            }, 150);
          }
        };
        $scope.scrollChats();


        $scope.addChat = () => {
          const timestamp = (new Date()).toLocaleString('en-GB');
          if (game.gameID !== null) {
            $scope.groupChats.$add({
              postedOn: timestamp,
              message: $scope.groupChat,
              postedBy: game.players[game.playerIndex].username
            });
            $scope.groupChat = '';
          }
        };
      }]
  });
