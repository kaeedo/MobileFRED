(function() {
  'use strict';

  var scope;
  var state;
  var ionicLoading;
  var askFred;
  var localStorage;

  var q;

  var fredData = {
    tournament: {},
    filters: {}
  };

  var upcomingCtrl;

  describe('upcoming tests', function() {
    beforeEach(function() {
      module('mobileFred');
    });

    beforeEach(inject(function($injector, $controller) {
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      ionicLoading = $injector.get('$ionicLoading');
      askFred = $injector.get('askFred');
      localStorage = $injector.get('localStorage');
      q = $injector.get('$q');

      upcomingCtrl = $controller('UpcomingCtrl', {
        $scope: scope,
        $state: state,
        $ionicLoading: ionicLoading,
        fredData: fredData,
        askFred: askFred,
        localStorage: localStorage
      });
    }));

    describe('get upcoming events', function() {
      it('should call askFred events', function() {
        spyOn(askFred, 'getEvents').and.returnValue(q.when({}));

        scope.getUpcomingEvents();

        expect(askFred.getEvents).toHaveBeenCalled();
      });
    });

    describe('tournament details', function() {
      it('should show loading', function() {
        spyOn(ionicLoading, 'show');

        scope.tournamentDetails();

        expect(ionicLoading.show).toHaveBeenCalled();
      });

      it('should navigate', function() {
        spyOn(state, 'go');

        scope.tournamentDetails();

        expect(state.go).toHaveBeenCalled();
      });
    });
  });
})();
