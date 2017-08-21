(function() {
  'use strict';

  var scope;
  var ionicSideMenuDelegate;
  var aboutCtrl;

  describe('About page tests', function() {
    beforeEach(function() {
      module('mobileFred');
    });

    beforeEach(inject(function($injector, $controller) {
      scope = $injector.get('$rootScope').$new();
      ionicSideMenuDelegate = $injector.get('$ionicSideMenuDelegate');

      aboutCtrl = $controller('AboutCtrl', {
        $scope: scope,
        $ionicSideMenuDelegate: ionicSideMenuDelegate
      });
    }));

    it('should toggle side menu', function() {
      spyOn(ionicSideMenuDelegate, 'toggleLeft');

      scope.menu();

      expect(ionicSideMenuDelegate.toggleLeft).toHaveBeenCalled();
    });
  });
})();
