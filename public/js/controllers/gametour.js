angular.module('mean.system')
.controller('GameTourController', function GameTourController() {

  const gameTour = introJs();
  gameTour.setOptions({
    steps: [{
      intro: 'Welcome to the game Cards for Humanity, You want to play this game?, then let me take you on a tour.'
    },
    {
      element: '#logo',
      intro: 'This is Cards for humanity official logo'
    },
    {
      element: '#question-container-outer',
      intro: 'Game needs a minimum of 3 players to start. Wait for the minimum number of players and start the game.',
    },
    {
      element: '#timer-container',
      intro: 'Choose an answer to the current question. After time out, CZAR then select a favorite answer. whoever submits CZAR\'s favorite answer wins the round.'
    },
    {
      element: '#player-container',
      intro: 'Players in the current game are shown here',
    },
    {
      element: '#chat-for-Tour',
      intro: 'Here, you can chat with other players.',
      position: 'top'
    },
    {
      element: '#abandon-game-button',
      intro: 'Played enough? Click this button to quit the game'
    },
    {
      element: '#answers-container',
      intro: 'These are the rules of the game',
      position: 'top'
    }
    ]
  });
  gameTour.start()
         .onexit(() => {
           window.location = '/';
         });
});
