(function(angular, moment) {
  'use strict';

  angular.module('mobileFred')
    .filter('unlocalizedMoment', UnlocalizedMoment);

  function UnlocalizedMoment() {
    return function(val, format) {
      if (val) {
        var timezone = val.substr(val.lastIndexOf('-'));

        return moment(val).utcOffset(timezone).format(format);
      }

      return val;
    };
  }
})(window.angular, window.moment);
