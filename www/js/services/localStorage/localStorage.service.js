(function(angular) {
  'use strict';
  angular.module('mobileFred')
    .factory('localStorage', [LocalStorage]);

  function LocalStorage() {
    var localStorage = {};
    var storage = {};

    localStorage.set = function(key, value) {
      storage[key] = JSON.stringify(value);
    };

    localStorage.get = function(key) {
      return JSON.parse(storage[key] || '{}');
    };

    localStorage.clear = function() {
      storage = {};
    };

    return localStorage;
  }
})(window.angular);
