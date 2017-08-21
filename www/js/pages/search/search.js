(function(angular, moment) {
  'use strict';

  angular.module('mobileFred')
    .controller('SearchCtrl', ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$ionicPopover', 'ionicMaterialInk', 'localStorage', 'geolocation', SearchCtrl]);

  function SearchCtrl(scope, state, ionicLoading, ionicPopup, ionicPopover, ionicMaterialInk, localStorage, geolocation) {
    if (typeof analytics !== 'undefined') {
      analytics.trackView('search');
    }

    ionicMaterialInk.displayEffect();

    localStorage.clear();

    ionicPopover.fromTemplateUrl('js/pages/search/searchPopover.html', {
      scope: scope
    }).then(function(popover) {
      scope.popover = popover;
    });

    scope.searchUpcoming = localStorage.get('searchUpcoming');

    scope.setUpcoming = function(isUpcoming) {
      scope.searchUpcoming = isUpcoming;
      localStorage.set('searchUpcoming', isUpcoming);
      scope.popover.hide();
    };

    scope.about = function() {
      state.go('about');
    };

    scope.search = function() {
      var searchParams = {
        name_contains: scope.name,
        division_id: scope.division,
        _page: 1
      };

      searchParams._sort = scope.searchUpcoming ? 'start_date_asc' : 'prereg_close_desc';

      if (scope.dateRange) {
        searchParams.start_date_gte = moment(scope.dateRange.startDate).format('YYYY-MM-DD');
        searchParams.prereg_close_lte = moment(scope.dateRange.endDate).format('YYYY-MM-DD');
      } else {
        searchParams[scope.searchUpcoming ? 'start_date_gte' : 'prereg_close_lte'] = moment().format('YYYY-MM-DD');
      }

      if (scope.miles) {
        ionicLoading.show({
          template: 'Getting location, please wait.'
        });

        geolocation.getCurrentPosition()
          .then(function(position) {
            scope.searchWithLocation(position, searchParams);
          })
          .catch(function(error) {
            if (typeof analytics !== 'undefined') {
              analytics.trackEvent('Error', 'GPS', 'GetLocation', error.message);
            }

            ionicLoading.hide();
            ionicPopup.alert({
              title: 'Oh no',
              template: 'Something bad happened while trying to get GPS position. Is it turned on?'
            });
          });
      } else {
        ionicLoading.show({
          template: 'Loading, please wait.'
        });

        localStorage.set('searchParams', searchParams);

        state.go('upcoming');
      }
    };

    scope.searchWithLocation = function(position, searchParams) {
      ionicLoading.hide();

      ionicLoading.show({
        template: 'Loading, please wait.'
      });

      searchParams.radius_mi = scope.miles;
      searchParams.lat = position.coords.latitude;
      searchParams.long = position.coords.longitude;

      localStorage.set('searchParams', searchParams);

      state.go('upcoming');
    };

    scope.$on('$destroy', function() {
      scope.popover.remove();
    });
  }
})(window.angular, window.moment);
