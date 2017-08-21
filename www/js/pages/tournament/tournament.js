(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .controller('TournamentCtrl', ['$scope', '$state', '$ionicLoading', '$cordovaCalendar', 'ionicMaterialInk', 'fredData', 'localStorage', TournamentCtrl]);

  function TournamentCtrl(scope, state, ionicLoading, cordovaCalendar, ionicMaterialInk, fredData, localStorage) {
    if (typeof analytics !== 'undefined') {
      analytics.trackView('tournament');
    }

    ionicMaterialInk.displayEffect();

    scope.tournament = fredData.tournament;
    scope.days = removeDuplicateDays(scope.tournament.events);

    scope.searchUpcoming = localStorage.get('searchUpcoming');

    scope.addToCalendar = function() {
      var startDate = moment(scope.tournament.start_date);

      cordovaCalendar.createEventInteractively({
        title: scope.tournament.name,
        location: scope.tournament.venue.name,
        startDate: startDate.toDate()
      });
    };

    scope.upcoming = function() {
      state.go('upcoming');
    };

    scope.sameDay = function(day) {
      return function(event) {
        var dayMoment = moment(day);
        var eventMoment = moment(event.close_of_reg || event.prereg_close);
        return dayMoment.isSame(eventMoment, 'day');
      };
    };

    scope.eventDetails = function(id) {
      ionicLoading.show({
        template: 'Loading, please wait.'
      });

      state.go(scope.searchUpcoming ? 'event' : 'eventResults', {
        id: id
      });
    };

    scope.navigate = function(address) {
      launchnavigator.navigate(address);
    };

    scope.preregister = function(id) {
      window.open('https://askfred.net/Events/Prereg/prereg.php?tournament_id=' + id, '_system', 'location=yes');
    };

    ionicLoading.hide();

    function removeDuplicateDays(array) {
      var output = [];
      var keys = [];

      angular.forEach(array, function(item) {
        var key = moment(item.close_of_reg).format('YYYY-MM-dd');

        if (keys.indexOf(key) === -1) {
          keys.push(key);
          output.push(item);
        }
      });

      return output;
    }
  }
})(window.angular);
