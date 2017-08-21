(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .service('geolocation', ['$q', Navigator]);

  function Navigator(q) {
    return {
      getCurrentPosition: getCurrentPosition
    };

    function getCurrentPosition() {
      var deferred = q.defer();

      navigator.geolocation.getCurrentPosition(function(position) {
        deferred.resolve(position);
      }, function(error) {
        deferred.reject(error);
      }, {
        timeout: 30000,
        enableHighAccuracy: false
      });

      return deferred.promise;
    }
  }

})(window.angular);
