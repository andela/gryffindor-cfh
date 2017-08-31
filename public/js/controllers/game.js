/* global introJs, localStorage */
angular.module('mean.system')
  .controller('GameController', ['$scope', 'game', '$timeout', '$location', 'MakeAWishFactsService', '$dialog',
    function GameController($scope, game, $timeout, $location, MakeAWishFactsService) {
      $scope.hasPickedCards = false;
      $scope.winningCardPicked = false;
      $scope.showTable = false;
      $scope.modalShown = false;
      $scope.game = game;
      $scope.pickedCards = [];
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

      $scope.pointerCursorStyle = () => {
        if ($scope.isCzar() && $scope.game.state === 'waiting for czar to decide') {
          return { cursor: 'pointer' };
        }
        return {};
      };

      $scope.sendPickedCards = function () {
        game.pickCards($scope.pickedCards);
        $scope.showTable = true;
      };

      $scope.cardIsFirstSelected = function (card) {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[0];
        }
        return false;
      };

      $scope.cardIsSecondSelected = function (card) {
        if (game.curQuestion.numAnswers > 1) {
          return card === $scope.pickedCards[1];
        }
        return false;
      };

      $scope.firstAnswer = function ($index) {
        if ($index % 2 === 0 && game.curQuestion.numAnswers > 1) {
          return true;
        }
        return false;
      };

      $scope.secondAnswer = function ($index) {
        if ($index % 2 === 1 && game.curQuestion.numAnswers > 1) {
          return true;
        }
        return false;
      };

      $scope.showFirst = function (card) {
        return game.curQuestion.numAnswers > 1 && $scope.pickedCards[0] === card.id;
      };

      $scope.showSecond = function (card) {
        return game.curQuestion.numAnswers > 1 && $scope.pickedCards[1] === card.id;
      };

      $scope.isCzar = function () {
        return game.czar === game.playerIndex;
      };

      $scope.isPlayer = function ($index) {
        return $index === game.playerIndex;
      };

      $scope.isCustomGame = function () {
        return !(/^\d+$/).test(game.gameID) && game.state === 'awaiting players';
      };

      $scope.isPremium = function ($index) {
        return game.players[$index].premium;
      };

      $scope.currentCzar = function ($index) {
        return $index === game.czar;
      };

      $scope.winningColor = function ($index) {
        if (game.winningCardPlayer !== -1 && $index === game.winningCard) {
          return $scope.colors[game.players[game.winningCardPlayer].color];
        }
        return '#f9f9f9';
      };

      $scope.pickWinning = function (winningSet) {
        if ($scope.isCzar()) {
          game.pickWinning(winningSet.card[0]);
          $scope.winningCardPicked = true;
        }
      };

      $scope.winnerPicked = function () {
        return game.winningCard !== -1;
      };

      $scope.startGame = function () {
        game.startGame();
      };

      $scope.abandonGame = function () {
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
                const txt = 'Give the following link to your friends so they can join your game: ';
                $('#lobby-how-to-play').text(txt);
                $('#oh-el').css({ 'text-align': 'center', 'font-size': '22px', background: 'white', color: 'black' }).text(link);
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
          element: '#abandon-game-button',
          intro: 'Played enough? Click this button to quit the game'
        },
        {
          element: '.retake-tour',
          intro: 'You can always take the tour again'
        },
        {
          element: '#answers-container',
          intro: 'These are the rules of the game',
          position: 'top'
        }
        ]
      });


      $scope.takeTour = function takeTour() {
        if (!localStorage.takenTour) {
          setTimeout(() => {
            $scope.gameTour.start()
              .onexit(() => {
              });
          }, 500);
          localStorage.takenTour = true;
        }
      };

      $scope.retakeTour = function retakeTour() {
        localStorage.removeItem('takenTour');
        $scope.takeTour();
      };


      if ($location.search().game && !(/^\d+$/).test($location.search().game)) {
        console.log('joining custom game');
        game.joinGame('joinGame', $location.search().game);
      } else if ($location.search().custom) {
        game.joinGame('joinGame', null, true);
      } else {
        game.joinGame();
      }
    }]);
