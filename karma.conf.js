'use strict';

module.exports = function(config) {

  config.set({
    frameworks: ['jasmine'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-jasmine'
    ],
    specReporter: {
      suppressPassed: true
    }
  });
};
