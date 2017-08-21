(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .controller('AboutCtrl', ['$scope', '$state', 'ionicMaterialInk', AboutCtrl]);

  function AboutCtrl(scope, state, ionicMaterialInk) {
    ionicMaterialInk.displayEffect();

    scope.search = function() {
      state.go('search');
    };
  }
})(window.angular);
