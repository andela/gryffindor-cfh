angular.module('mean.directives', [])
  .directive('player', () => ({
    restrict: 'EA',
    templateUrl: '/views/player.html',
    link(scope, elem, attr) {// eslint-disable-line
      scope.colors = ['#7CE4E8', '#FFFFa5', '#FC575E', '#F2ADFF', '#398EC4', '#8CFF95'];
    }
  })).directive('answers', () => ({
    restrict: 'EA',
    templateUrl: '/views/answers.html',
    link(scope, elem, attr) {// eslint-disable-line
      scope.$watch('game.state', () => {
        if (scope.game.state === 'winner has been chosen') {
          const curQ = scope.game.curQuestion;
          const curQuestionArr = curQ.text.split('_');
          const startStyle = `<span style='color: ${scope.colors[scope.game.players[scope.game.winningCardPlayer].color]}'>`;
          const endStyle = '</span>';
          let shouldRemoveQuestionPunctuation = false;
          const removePunctuation = (cardIndex) => {
            let cardText = scope.game.table[scope.game.winningCard].card[cardIndex].text;
            if (cardText.indexOf('.', cardText.length - 2) === cardText.length - 1) {
              cardText = cardText.slice(0, cardText.length - 1);
            } else if ((cardText.indexOf('!', cardText.length - 2) === cardText.length - 1 ||
                cardText.indexOf('?', cardText.length - 2) === cardText.length - 1) &&
                cardIndex === curQ.numAnswers - 1) {
              shouldRemoveQuestionPunctuation = true;
            }
            return cardText;
          };
          if (curQuestionArr.length > 1) {
            let cardText = removePunctuation(0);
            curQuestionArr.splice(1, 0, startStyle + cardText + endStyle);
            if (curQ.numAnswers === 2) {
              cardText = removePunctuation(1);
              curQuestionArr.splice(3, 0, startStyle + cardText + endStyle);
            }
            curQ.text = curQuestionArr.join('');
            // Clean up the last punctuation mark in the question 
            // if there already is one in the answer
            if (shouldRemoveQuestionPunctuation) {
              if (curQ.text.indexOf('.', curQ.text.length - 2) === curQ.text.length - 1) {
                curQ.text = curQ.text.slice(0, curQ.text.length - 2);
              }
            }
          } else {
            curQ.text += ` ${startStyle}${scope.game.table[scope.game.winningCard].card[0].text}${endStyle}`;
          }
        }
      });
    }
  })).directive('question', () => ({
    restrict: 'EA',
    templateUrl: '/views/question.html',
    link(scope, elem, attr) {}// eslint-disable-line
  }))
  .directive('timer', () => ({
    restrict: 'EA',
    templateUrl: '/views/timer.html',
    link(scope, elem, attr) {}// eslint-disable-line
  }))
  .directive('landing', () => ({
    restrict: 'EA',
    link(scope, elem, attr) {// eslint-disable-line
      scope.showOptions = true;

      if (scope.$$childHead.global.authenticated === true) {
        scope.showOptions = false;
      }
    }
  }));
