(function(angular) {
  'use strict';
  angular.module('mobileFred')
    .controller('EventCtrl', ['$scope', '$state', '$timeout', '$ionicLoading', 'ionicMaterialInk', 'ionicMaterialMotion', 'fredData', EventCtrl]);

  function EventCtrl(scope, state, timeout, ionicLoading, ionicMaterialInk, ionicMaterialMotion, fredData) {
    if (typeof analytics !== 'undefined') {
      analytics.trackView('event');
    }

    animateIn();

    scope.event = fredData.event;

    scope.tournament = function() {
      state.go('tournament', {
        id: scope.event.tournament_id
      });
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
