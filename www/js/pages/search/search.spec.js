(function() {
  'use strict';

  var scope;
  var state;
  var ionicLoading;
  var ionicPopup;
  var ionicSideMenuDelegate;
  var localStorage;
  var geolocation;

  var searchCtrl;

  describe('Search page tests', function() {
    beforeEach(function() {
      module('mobileFred');
    });

    beforeEach(inject(function($injector, $controller) {
      scope = $injector.get('$rootScope').$new();
      state = $injector.get('$state');
      ionicLoading = $injector.get('$ionicLoading');
      ionicPopup = $injector.get('$ionicPopup');
      ionicSideMenuDelegate = $injector.get('$ionicSideMenuDelegate');
      localStorage = $injector.get('localStorage');
      geolocation = $injector.get('geolocation');

      searchCtrl = $controller('SearchCtrl', {
        $scope: scope,
        $state: state,
        $ionicLoading: ionicLoading,
        $ionicPopup: ionicPopup,
        $ionicSideMenuDelegate: ionicSideMenuDelegate,
        localStorage: localStorage,
        geolocation: geolocation
      });
    }));

    describe('side menu tests', function() {
      beforeEach(function() {
        spyOn(ionicSideMenuDelegate, 'toggleLeft');
        scope.menu();
      });

      it('should toggle side menu', function() {
        expect(ionicSideMenuDelegate.toggleLeft).toHaveBeenCalled();
      });
    });

    describe('search upcoming tests', function() {
      var searchParams = {};
      beforeEach(function() {
        searchParams = {
          name_contains: 'name',
          division_id: 1,
          _page: 1,
          _sort: 'start_date_asc',
          start_date_gte: moment().format('YYYY-MM-DD')
        };

        spyOn(localStorage, 'set');
        spyOn(state, 'go');

        scope.searchUpcoming = true;
        scope.name = 'name';
        scope.division = 1;
      });

      describe('when miles are not set', function() {
        beforeEach(function() {
          scope.search();
        });

        it('should save search params in localStorage', function() {
          expect(localStorage.set).toHaveBeenCalledWith('searchParams', searchParams);
        });

        it('should go to next step', function() {
          expect(state.go).toHaveBeenCalledWith('upcoming');
        });
      });

      describe('when searching with location', function() {
        beforeEach(function() {
          var position = {
            coords: {
              latitude: 42,
              longitude: 43
            }
          };

          scope.miles = 100;

          spyOn(ionicLoading, 'hide');
          spyOn(ionicLoading, 'show');

          scope.searchWithLocation(position, searchParams);
        });

        it('should set latitude and longitude', function() {
          expect(searchParams.lat).toBe(42);
          expect(searchParams.long).toBe(43);
        });

        it('should save to localStorage', function() {
          expect(localStorage.set).toHaveBeenCalledWith('searchParams', searchParams);
        });

        it('should navigate to upcoming', function() {
          expect(state.go).toHaveBeenCalledWith('upcoming');
        })
      });
    });
  });
})();
