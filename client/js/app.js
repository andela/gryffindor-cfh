angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'ngSanitize', 'mean.system', 'mean.directives', 'mean.components'])
  .config(['$routeProvider',
    ($routeProvider) => {
      $routeProvider
        .when('/', {
          templateUrl: 'views/index.html'
        })
        .when('/app', {
          templateUrl: '/views/app.html',
        })
        .when('/privacy', {
          templateUrl: '/views/privacy.html',
        })
        .when('/bottom', {
          templateUrl: '/views/bottom.html'
        })
        .when('/signin', {
          templateUrl: '/views/signin.html'
        })
        .when('/signup', {
          templateUrl: '/views/signup.html'
        })
        .when('/choose-avatar', {
          templateUrl: '/views/choose-avatar.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]).config(['$locationProvider',
    ($locationProvider) => {
      $locationProvider.hashPrefix('!');
    }
  ]).config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push('tokenInjector');
  }])
  .run(['$rootScope', ($rootScope) => {
    $rootScope.safeApply = function safeApply(fn) {
      const phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }])
  .run(['DonationService', '$window', (DonationService, $window) => {
    $window.userDonationCb = (donationObject) => {
      DonationService.userDonated(donationObject);
    };
  }]);

angular.module('mean.system', []);
angular.module('mean.directives', []);
angular.module('mean.components', []);
