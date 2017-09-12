angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'mean.system', 'mean.directives'])
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
  ]).run(['$rootScope', ($rootScope) => {
<<<<<<< HEAD
    $rootScope.safeApply = (fn) => {
=======
    $rootScope.safeApply = function safeApply(fn) {
>>>>>>> b75f726854b8eaf92e42e06717b63b210a16e702
      const phase = this.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof (fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
<<<<<<< HEAD
  }]).run(['DonationService', (DonationService) => {// eslint-disable-line
    window.userDonationCb = (donationObject) => {// eslint-disable-line
=======
  }])
  .run(['DonationService', '$window', (DonationService, $window) => {
    $window.userDonationCb = (donationObject) => {
>>>>>>> b75f726854b8eaf92e42e06717b63b210a16e702
      DonationService.userDonated(donationObject);
    };
  }]);

angular.module('mean.system', []);
angular.module('mean.directives', []);
