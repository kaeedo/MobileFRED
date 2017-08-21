(function() {
  'use strict';

  var scope;
  var ionicLoading;
  var fredData = {
    event: 'anEvent'
  };
  var eventCtrl;

  describe('Event page tests', function() {
    beforeEach(function() {
      module('mobileFred');
    });

    beforeEach(inject(function($injector, $controller) {
      scope = $injector.get('$rootScope').$new();
      ionicLoading = $injector.get('$ionicLoading');

      eventCtrl = $controller('EventCtrl', {
        $scope: scope,
        $ionicLoading: ionicLoading,
        fredData: fredData
      });
    }));

    it('should set event data', function() {
      expect(scope.event).toEqual('anEvent');
    });
  });
})();
