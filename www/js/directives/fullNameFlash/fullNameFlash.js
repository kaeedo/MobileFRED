(function() {
  'use strict';

  angular.module('mobileFred')
    .directive('mfFullNameFlash', ['$window', FullNameFlash]);

  function FullNameFlash(window) {
    return {
      restrict: 'A',
      scope: {
        mfFullNameFlash: '@'
      },
      link: function($scope, $element) {
        $element.on('click', function() {
          if (!$scope.mfFullNameFlash) {
            return;
          }

          var previousText = $element.html();
          $element.html($scope.mfFullNameFlash);
          window.setTimeout(function() {
            $element.html(previousText);
          }, 3000);
        });
      }
    };
  }

})(window.angular);