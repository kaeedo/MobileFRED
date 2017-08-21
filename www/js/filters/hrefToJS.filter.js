(function(angular) {
  'use strict';

  angular.module('mobileFred')
    .filter('hrefToJS', ['$sce', '$sanitize', HrefToJS]);

  function HrefToJS(sce, sanitize) {
    return function(text) {
      var regex = /href="([\S]+)"/g;
      var newString = sanitize(text).replace(regex, "href='javascript:void(0)' onClick=\"window.open('$1', '_system', 'location=yes')\"");
      return sce.trustAsHtml(newString);
    };
  }
})(window.angular);
