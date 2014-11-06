var gulp = require('gulp'),
  mainBowerFiles = require('main-bower-files'),
  jsmin = require('gulp-jsmin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  compass = require('gulp-compass'),
  livereload = require('gulp-livereload');

var bowerPath = 'bower_components';
var jsFiles = ['assets/js/menu.js'];

// move all necessary bower files into assets
gulp.task('getBowerFiles', function() {
    return gulp.src(mainBowerFiles(/* options */), { base: bowerPath })
        .pipe(gulp.dest('assets/bower'))
});

gulp.task('lint', function(){
  gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});

// concat all scripts, minify, and output
gulp.task('compile', ['lint'], function(){
  return gulp.src(jsFiles)
    .pipe(concat("all.js", {newLine: '\r\n'}))
    .pipe(jsmin())
    .pipe(gulp.dest('./assets/js/dist/'))
});

gulp.task('compass', function() {
  gulp.src('./assets/sass/*.scss')
  .pipe(compass({
    config_file: './config.rb',
    css: 'assets/css',
    sass: 'assets/sass'
  }))
  .on('error', function(err) {
      // Would like to catch the error here
    })
  // .pipe(gulp.dest('app/assets/temp'));
});

gulp.task('default', ['getBowerFiles', 'compile', 'compass'], function(){
  // Watch JS files
  gulp.watch("assets/js/*.js", ['compile']);
  // Watch scss files
  gulp.watch("assets/sass/**/*.scss", ['compass']);
  // Init Livereload
  livereload.listen();
  // Watch css files and php template files
  gulp.watch(["assets/css/*", "templates/**", "assets/js/dist/*"]).on('change', livereload.changed);
});