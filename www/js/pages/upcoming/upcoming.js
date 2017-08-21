(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .controller('UpcomingCtrl', ['$scope', '$state', '$timeout', '$ionicLoading', 'ionicMaterialInk', 'ionicMaterialMotion', 'fredData', 'askFred', 'localStorage', UpcomingCtrl]);

  function UpcomingCtrl(scope, state, timeout, ionicLoading, ionicMaterialInk, ionicMaterialMotion, fredData, askFred, localStorage) {
    if (typeof analytics !== 'undefined') {
      analytics.trackView('upcoming');
    }

    animateIn();

    scope.tournaments = fredData.tournaments;
    scope.searchUpcoming = localStorage.get('searchUpcoming');

    var params = fredData.filters;
    params._page = 1;

    scope.getUpcomingEvents = function() {
      askFred.getEvents(params).then(function(data) {
        scope.end = data.tournaments.length < data.per_page;
        scope.tournaments.push.apply(scope.tournaments, data.tournaments);
        scope.$broadcast('scroll.infiniteScrollComplete');
        animateIn();
      });
    };

    scope.tournamentDetails = function(id) {
      ionicLoading.show({
        template: 'Loading, please wait.'
      });

      state.go('tournament', {
        id: id
      });
    };

    scope.loadMore = function() {
      params._page++;
      scope.getUpcomingEvents();
    };

    scope.search = function() {
      state.go('search');
    };

    ionicLoading.hide();

    function animateIn() {
      timeout(function() {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
      });
    }
  }
})(window.angular);
