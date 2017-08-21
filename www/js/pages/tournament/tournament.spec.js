(function() {
  'use strict';

  var scope;
  var state;
  var ionicLoading;
  var localStorage;

  var fredData = {
    tournament: {}
  };

  var tournamentCtrl;

  describe('tournament tests', function() {
    beforeEach(function() {
      module('mobileFred');
    });

    beforeEach(inject(function($injector, $controller) {
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      ionicLoading = $injector.get('$ionicLoading');
      localStorage = $injector.get('localStorage');

      tournamentCtrl = $controller('TournamentCtrl', {
        $scope: scope,
        $state: state,
        $ionicLoading: ionicLoading,
        fredData: fredData,
        localStorage: localStorage
      });
    }));

    describe('event details', function() {
      it('should show loading', function() {
        spyOn(ionicLoading, 'show');

        scope.eventDetails(1);

        expect(ionicLoading.show).toHaveBeenCalled();
      });

      it('should navigate to event', function() {
        spyOn(state, 'go');

        scope.searchUpcoming = true;

        scope.eventDetails(1);

        expect(state.go).toHaveBeenCalledWith('event', {
          id: 1
        });
      });

      it('should navigate to eventResults', function() {
        spyOn(state, 'go');

        scope.searchUpcoming = false;

        scope.eventDetails(1);

        expect(state.go).toHaveBeenCalledWith('eventResults', {
          id: 1
        });
      });
    });

    describe('preregister tests', function() {
      it('should open a separate window', function() {
        spyOn(window, 'open');

        scope.preregister(1);

        expect(window.open).toHaveBeenCalledWith('https://askfred.net/Events/Prereg/prereg.php?tournament_id=1', '_system', 'location=yes');
      });
    });
  });
})();
