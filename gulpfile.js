(function(angular) {
  'use strict';

  var gulp = require('gulp');
  var mainBowerFiles = require('main-bower-files');
  var karma = require('karma');
  var gutil = require('gulp-util');
  var bower = require('bower');
  var sass = require('gulp-sass');
  var minifyCss = require('gulp-minify-css');
  var rename = require('gulp-rename');
  var sh = require('shelljs');

  var paths = {
    sass: ['www/js/**/*.scss']
  };

  var startKarma = function(done) {
    var testFiles = mainBowerFiles().concat([
      'www/lib/ionic/js/ionic.js',
      'www/lib/ionic/js/ionic-angular.js',
      'www/js/bootstrap.js',
      'www/js/**/*!(.spec).js',
      'www/js/**/*.spec.js'
    ]);

    var server = new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['PhantomJS'],
        reporters: ['spec'],
        singleRun: false,
        autoWatch: true,
        files: testFiles
      },
      function(numberOfFailedTests) {
        if (numberOfFailedTests) {
          throw new Error('Terminating process due to ' + numberOfFailedTests + ' failing tests.');
        }

        if (done && typeof done === 'function') {
          done();
        }
      });

    server.start();
  };

  gulp.task('test', function(done) {
    return startKarma(done);
  });

  gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
      .pipe(sass())
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
  });

  gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
  });

  gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
      .on('log', function(data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
      });
  });

  gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
      console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
        '\n  Git, the version control system, is required to download Ionic.',
        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
      );
      process.exit(1);
    }
    done();
  });
})();
