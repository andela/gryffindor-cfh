angular.module('mean.system')
  .factory('socket', ['$rootScope', function($rootScope) {
    const socket = io.connect();
    return {
      on(eventName, callback) {
        socket.on(eventName, function() {
          const args = arguments;
          $rootScope.safeApply(() => {
            callback.apply(socket, args);
          });
        });
      },
      emit(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          const args = arguments;
        });
        $rootScope.safeApply(() => {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      },
      removeAllListeners(eventName, callback) {
        socket.removeAllListeners(eventName, function () {
          const args = arguments;
          $rootScope.safeApply(() => {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  }]);
