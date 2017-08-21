(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .controller('EventResultsCtrl', ['$scope', '$state', '$timeout', '$ionicLoading', 'ionicMaterialInk', 'ionicMaterialMotion', 'fredData', EventResultsCtrl]);

  function EventResultsCtrl(scope, state, timeout, ionicLoading, ionicMaterialInk, ionicMaterialMotion, fredData) {
    if (typeof analytics !== 'undefined') {
      analytics.trackView('event results');
    }

    animateIn();

    scope.tournament = function() {
      state.go('tournament', {
        id: scope.event.tournament_id
      });
    };

    scope.event = fredData.event;

    ionicLoading.hide();

    function animateIn() {
      timeout(function() {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
      });
    }
  }
})(window.angular);
