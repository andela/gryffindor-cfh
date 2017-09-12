/* global introJs, localStorage */
angular.module('mean.system')
  .controller('GameController', ['$scope', 'game', '$timeout', 'userSearch', '$location', 'MakeAWishFactsService',
    function GameController($scope, game, $timeout, userSearch, $location, MakeAWishFactsService) {
      $scope.hasPickedCards = false;
      $scope.winningCardPicked = false;
      $scope.showTable = false;
      $scope.modalShown = false;
      $scope.game = game;
      $scope.pickedCards = [];
      $scope.searchedUsers = [];
      $scope.invitedUsers = [];
      $scope.selectedUser = '';
      let makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
      $scope.makeAWishFact = makeAWishFacts.pop();

      $scope.pickCard = (card) => {
        if (!$scope.hasPickedCards) {
          if ($scope.pickedCards.indexOf(card.id) < 0) {
            $scope.pickedCards.push(card.id);
            if (game.curQuestion.numAnswers === 1) {
              $scope.sendPickedCards();
              $scope.hasPickedCards = true;
            } else if (game.curQuestion.numAnswers === 2 &&
              $scope.pickedCards.length === 2) {
              // delay and send
              $scope.hasPickedCards = true;
              $timeout($scope.sendPickedCards, 300);
            }
          } else {
            $scope.pickedCards.pop();
          }
        }
      };

      $scope.checkDisable = selectedEmail => $scope.invitedUsers.indexOf(selectedEmail) === -1;

      $scope.selectUser = (selectedEmail) => {
        if ($scope.invitedUsers.length <= 11) {
          const mailObject = {
            To: selectedEmail,
            Link: document.URL
          };
          userSearch.sendInvite(mailObject)
            .then(() => {
              $scope.invitedUsers.push(selectedEmail);
            })
            .catch(() => {
              const myModal = $('#limit_modal');
              myModal.find('.modal-body')
                .text('Error occured while inviting users');
              myModal.modal('show');
            });
        }
      };

      $scope.searchUsers = () => {
        if ($scope.selectedUser !== '') {
          userSearch.search($scope.selectedUser).then((data) => {
            $scope.searchedUsers = data.data;
          });
        } else {
          $scope.searchedUsers = [];
        }
      };

      $scope.pointerCursorStyle = () => {
        if ($scope.isCzar() && $scope.game.state === 'waiting for czar to decide') {
          return { cursor: 'pointer' };
        }
        return {};
      };

      $scope.sendPickedCards = () => {
        game.pickCards($scope.pickedCards);
        $scope.showTable = true;
      };

      $scope.cardIsFirstSelected = (card) => {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[0];
        }
        return false;
      };

      $scope.cardIsSecondSelected = (card) => {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[1];
        }
        return false;
      };

      $scope.firstAnswer = $index => ($index % 2 === 0 && game.curQuestion.numAnswers > 1);

      $scope.secondAnswer = $index => ($index % 2 === 1 && game.curQuestion.numAnswers > 1);

      $scope.showFirst = card => game.curQuestion.numAnswers > 1
        && $scope.pickedCards[0] === card.id;

      $scope.showSecond = card => game.curQuestion.numAnswers > 1
        && $scope.pickedCards[1] === card.id;

      $scope.isCzar = () => game.czar === game.playerIndex;

      $scope.isPlayer = $index => $index === game.playerIndex;

      $scope.isCustomGame = () => !(/^\d+$/).test(game.gameID)
        && game.state === 'awaiting players';

      $scope.isPremium = $index => game.players[$index].premium;

      $scope.currentCzar = $index => $index === game.czar;

      $scope.winningColor = ($index) => {
        if (game.winningCardPlayer !== 1 && $index === game.winningCard) {
          return $scope.colors[game.players[game.winningCardPlayer].color];
        }
        return '#f9f9f9';
      };

      $scope.pickWinning = (winningSet) => {
        if ($scope.isCzar()) {
          game.pickWinning(winningSet.card[0]);
          $scope.winningCardPicked = true;
        }
      };

      $scope.winnerPicked = () => game.winningCard !== 1;

      $scope.startGame = () => {
        game.startGame();
      };

      $scope.abandonGame = () => {
        game.leaveGame();
        $location.path('/');
      };
      $scope.shuffleCards = () => {
        const card = $(`#${event.target.id}`); //eslint-disable-line
        card.addClass('animated flipOutY');
        setTimeout(() => {
          $scope.startNextRound();
          card.removeClass('animated flipOutY');
          $('#start-modal').modal('hide');
        }, 500);
      };

      $scope.startNextRound = () => {
        if ($scope.isCzar()) {
          game.startNextRound();
        }
      };

      // Catches changes to round to update when no players pick card
      // (because game.state remains the same)
      $scope.$watch('game.round', () => {
        $scope.hasPickedCards = false;
        $scope.showTable = false;
        $scope.winningCardPicked = false;
        $scope.makeAWishFact = makeAWishFacts.pop();
        if (!makeAWishFacts.length) {
          makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
        }
        $scope.pickedCards = [];
      });

      $scope.winnerPicked = () => game.winningCard !== 1;


      $scope.startGame = () => {
        game.startGame();
      };

      $scope.abandonGame = () => {
        game.leaveGame();
        $location.path('/');
      };

      // Catches changes to round to update when no players pick card
      // (because game.state remains the same)
      $scope.$watch('game.round', () => {
        $scope.hasPickedCards = false;
        $scope.showTable = false;
        $scope.winningCardPicked = false;
        $scope.makeAWishFact = makeAWishFacts.pop();
        if (!makeAWishFacts.length) {
          makeAWishFacts = MakeAWishFactsService.getMakeAWishFacts();
        }
        $scope.pickedCards = [];
      });

      // In case player doesn't pick a card in time, show the table
      $scope.$watch('game.state', () => {
        if (game.state === 'waiting for czar to decide' && $scope.showTable === false) {
          $scope.showTable = true;
        }
        if ($scope.isCzar() && game.state === 'czar pick card' && game.table.length === 0) {
          $('#start-modal').modal('show');
        }
        if (game.state === 'game dissolved') {
          $('#start-modal').modal('hide');
        }
        if ($scope.isCzar() === false && game.state === 'czar pick card'
          && game.state !== 'game dissolved'
          && game.state !== 'awaiting players' && game.table.length === 0) {
          $scope.czarHasDrawn = 'Wait! Czar is drawing Card';
        }
        if (game.state !== 'czar pick card'
          && game.state !== 'awaiting players'
          && game.state !== 'game dissolve') {
          $scope.czarHasDrawn = '';
        }
      });

      $scope.$watch('game.gameID', () => {
        if (game.gameID && game.state === 'awaiting players') {
          if (!$scope.isCustomGame() && $location.search().game) {
            // If the player didn't successfully enter the request room,
            // reset the URL so they don't think they're in the requested room.
            $location.search({});
          } else if ($scope.isCustomGame() && !$location.search().game) {
            // Once the game ID is set, update the URL if this is a game with friends,
            // where the link is meant to be shared.
            $location.search({ game: game.gameID });
            if (!$scope.modalShown) {
              setTimeout(() => {
                const link = document.URL;
                const txt = `Give the following link to 
                your friends so they can join your game: `;
                $('#lobby-how-to-play').text(txt);
                $('#oh-el').css(
                  {
                    'text-align': 'center',
                    'font-size': '22px',
                    background: 'white',
                    color: 'black'
                  }).text(link);
              }, 200);
              $scope.modalShown = true;
            }
          }
        }
      });

      $scope.gameTour = introJs();

      $scope.gameTour.setOptions({
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
          element: '#abandon-game-btn',
          intro: 'Played enough? Click this button to quit the game'
        },
        {
          element: '#retake-tour',
          intro: 'You can always take the tour again'
        },
        {
          element: '#info-container',
          intro: 'These are the rules of the game',
          position: 'top'
        }
        ]
      });

      $scope.takeTour = () => {
        if (!localStorage.takenTour) {
          const timeout = setTimeout(() => {
            $scope.gameTour.start();
            clearTimeout(timeout);
          }, 500);
          localStorage.setItem('takenTour', true);
        }
      };

      $scope.retakeTour = () => {
        localStorage.removeItem('takenTour');
        $scope.takeTour();
      };


      if ($location.search().game && !(/^\d+$/).test($location.search().game)) {
        game.joinGame('joinGame', $location.search().game);
      } else if ($location.search().custom) {
        game.joinGame('joinGame', null, true);
      } else {
        game.joinGame();
      }
    }]);
