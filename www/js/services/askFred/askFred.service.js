(function(angular) {
  'use strict';
  angular.module('mobileFred')
    .service('askFred', ['$http', '$q', '$ionicPopup', '$ionicLoading', 'localStorage', AskFred]);

  function AskFred(http, q, ionicPopup, ionicLoading, localStorage) {
    var apiKey = '';
    var upcomingEventsUrl = 'https://api.askfred.net/v1/tournament?_format=jsonp&_jsonp_callback=JSON_CALLBACK&is_cancelled=0&_api_key=' + apiKey;
    var tournamentByIdUrl = 'https://api.askfred.net/v1/tournament/{{ID}}?_format=jsonp&_jsonp_callback=JSON_CALLBACK&_api_key=' + apiKey;
    var eventByIdUrl = 'https://api.askfred.net/v1/event/{{ID}}?_format=jsonp&_jsonp_callback=JSON_CALLBACK&_api_key=' + apiKey;
    var fencerByIdUrl = 'https://api.askfred.net/v1/fencer/{{ID}}?_format=jsonp&_jsonp_callback=JSON_CALLBACK&_api_key=' + apiKey;

    return {
      getEvents: getEvents,
      getTournamentById: getTournamentById,
      getEventById: getEventById,
      getFencerById: getFencerById
    };

    function getEvents(params) {
      var deferred = q.defer();

      var upcoming = localStorage.get('upcoming');

      if (angular.equals({}, upcoming)) {
        http.jsonp(upcomingEventsUrl, {
            params: params,
            timeout: 10000
          })
          .success(function(data) {
            localStorage.set('upcoming', data);
            deferred.resolve(data);
          })
          .error(function(err) {
            ionicLoading.hide();
            ionicPopup.alert({
              title: 'Oh no',
              template: 'Unfortunately something bad happened. Try again later'
            });

            deferred.reject(err);
          });
      } else {
        if (params._page === 1) {
          deferred.resolve(upcoming);
        } else {
          http.jsonp(upcomingEventsUrl, {
              params: params,
              timeout: 10000
            })
            .success(function(data) {
              deferred.resolve(data);

              upcoming.tournaments.push.apply(upcoming.tournaments, data.tournaments);
              localStorage.set('upcoming', upcoming);
            })
            .error(function(err) {
              ionicLoading.hide();
              ionicPopup.alert({
                title: 'Oh no',
                template: 'Unfortunately something bad happened. Try again later'
              });

              deferred.reject(err);
            });
        }
      }

      return deferred.promise;
    }

    function getTournamentById(id) {
      var deferred = q.defer();

      var tournament = localStorage.get(id);

      if (angular.equals({}, tournament)) {
        http.jsonp(tournamentByIdUrl.replace('{{ID}}', id), {
            timeout: 10000
          })
          .success(function(data) {
            localStorage.set(id, data);
            deferred.resolve(data);
          })
          .error(function(err) {
            ionicLoading.hide();
            ionicPopup.alert({
              title: 'Oh no',
              template: 'Unfortunately something bad happened. Try again later'
            });

            deferred.reject(err);
          });
      } else {
        deferred.resolve(tournament);
      }

      return deferred.promise;
    }

    function getEventById(id) {
      var deferred = q.defer();

      http.jsonp(eventByIdUrl.replace('{{ID}}', id), {
          timeout: 10000
        })
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(err) {
          ionicLoading.hide();
          ionicPopup.alert({
            title: 'Oh no',
            template: 'Unfortunately something bad happened. Try again later'
          });

          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getFencerById(id) {
      var deferred = q.defer();

      var fencer = localStorage.get(id);

      if (angular.equals({}, fencer)) {
        http.jsonp(fencerByIdUrl.replace('{{ID}}', id), {
            timeout: 10000
          })
          .success(function(data) {
            localStorage.set(id, data);
            deferred.resolve(data);
          })
          .error(function(err) {
            ionicLoading.hide();
            ionicPopup.alert({
              title: 'Oh no',
              template: 'Unfortunately something bad happened. Try again later'
            });

            deferred.reject(err);
          });
      } else {
        deferred.resolve(fencer);
      }

      return deferred.promise;
    }
  }
})(window.angular);
