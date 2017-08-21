(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .service('geolocation', ['$q', '$cordovaGeolocation', Navigator]);

  function Navigator(q, cordovaGeolocation) {
    return {
      getCurrentPosition: getCurrentPosition
    };

    function getCurrentPosition() {
      var deferred = q.defer();

      cordovaGeolocation.getCurrentPosition(function(position) {
        q.resolve(position);
      }, function(error) {
        q.reject(error);
      });

      return deferred.promise;
    }
  }

})(window.angular);
