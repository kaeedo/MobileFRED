(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .config(['$stateProvider', '$urlRouterProvider', MobileFredConfig]);

  function MobileFredConfig(stateProvider, urlRouterProvider) {
    urlRouterProvider.otherwise('/');

    stateProvider.state('search', {
      url: '/',
      templateUrl: 'js/pages/search/search.tpl.html',
      controller: 'SearchCtrl'
    });

    stateProvider.state('upcoming', {
      url: '/upcoming',
      templateUrl: 'js/pages/upcoming/upcoming.tpl.html',
      controller: 'UpcomingCtrl',
      resolve: {
        fredData: ['localStorage', 'askFred', function(localStorage, askFred) {
          var params = localStorage.get('searchParams');
          return askFred.getEvents(params);
        }]
      }
    });

    stateProvider.state('tournament', {
      url: '/tournament/:id',
      templateUrl: 'js/pages/tournament/tournament.tpl.html',
      controller: 'TournamentCtrl',
      resolve: {
        fredData: ['$stateParams', 'askFred', function(stateParams, askFred) {
          return askFred.getTournamentById(stateParams.id);
        }]
      }
    });

    stateProvider.state('event', {
      url: '/event/:id',
      templateUrl: 'js/pages/event/event.tpl.html',
      controller: 'EventCtrl',
      resolve: {
        fredData: ['$stateParams', 'askFred', function(stateParams, askFred) {
          return askFred.getEventById(stateParams.id);
        }]
      }
    });

    stateProvider.state('eventResults', {
      url: '/eventresults/:id',
      templateUrl: 'js/pages/eventResults/eventResults.tpl.html',
      controller: 'EventResultsCtrl',
      resolve: {
        fredData: ['$stateParams', 'askFred', function(stateParams, askFred) {
          return askFred.getEventById(stateParams.id);
        }]
      }
    });

    stateProvider.state('about', {
      url: '/about',
      templateUrl: 'js/pages/about/about.tpl.html',
      controller: 'AboutCtrl'
    });
  }

  angular.module('mobileFred')
    .run(['$ionicPlatform', function(ionicPlatform) {
      ionicPlatform.ready(function() {
        if (typeof analytics !== 'undefined') {
          analytics.startTrackerWithId('UA-42707634-3');
        }

        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }]);
})(window.angular);
