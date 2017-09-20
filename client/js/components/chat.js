/* global Firebase */
angular.module('mean.components', [])
  .component('chatBox', {
    controllerAs: '$chatCtrl',
    templateUrl: '/views/chat.html',
    bindings: {
      gameID: '<'
    },
    controller: ChatController
  });
ChatController.$inject = ['game', '$firebaseArray'];

/**
 *
 *
 * @param {any} game 
 * @param {any} $firebaseArray 
 * @returns {void} returns void
 */
function ChatController(game, $firebaseArray) {
  const vm = this;
  vm.$onInit = () => {
    vm.groupChat = '';
    vm.game = game;
    vm.notificationCount = 0;
    vm.gameID = '';
  };

  let chatRef;

  this.$onChanges = (chatBoxAttr) => {
    if (chatBoxAttr.gameID && chatBoxAttr.gameID.currentValue !== vm.gameID) {
      chatRef = new Firebase(`https://cfhchat-3be15.firebaseio.com/messages/${vm.gameID}`);
      vm.groupChats = $firebaseArray(chatRef);
      vm.groupChats.$watch((event) => {
        const insertedRecord = vm.groupChats.$getRecord(event.key);
        if (insertedRecord !== null) {
          if (insertedRecord.postedBy !== game.players[game.playerIndex].username) {
            vm.notificationCount = 1;
          }
        }
        vm.scrollChats();
      });
    }
  };

  vm.reduceNotificationCount = () => {
    vm.notificationCount = 0;
  };

  vm.scrollChats = () => {
    const element = document.getElementById('message-cont');
    if (element) {
      const timeout = setTimeout(() => {
        element.scrollTop = element.scrollHeight;
        clearTimeout(timeout);
      }, 150);
    }
  };
  vm.scrollChats();


  vm.addChat = (message) => {
    const timestamp = (new Date()).toLocaleString('en-GB');
    if (vm.game.gameID && vm.groupChats.$add) {
      vm.groupChats.$add({
        postedOn: timestamp,
        message,
        postedBy: game.players[game.playerIndex].username
      });
      vm.groupChat = '';
    }
  };
}
