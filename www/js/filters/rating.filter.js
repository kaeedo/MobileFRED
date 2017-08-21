(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .filter('rating', Rating);

  function Rating() {
    return function(val) {
      var formatted = val;
      if (formatted !== 'U') {
        formatted = formatted.slice(0, 1) + formatted.slice(3, 5);
      }

      return formatted;
    };
  }
})(window.angular);
