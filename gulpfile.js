var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var rename = require("gulp-rename");

gulp.task('copy', function () {
  gulp.src('index.html')
  .pipe(gulp.dest('assets'))
});

gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('sass', function() {
  gulp.src('assets/ass/app.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(rename('styles.css'))
    .on('error', gutil.log)
  .pipe(gulp.dest('css/'))
  .pipe(connect.reload())
});


var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function() {
  gulp.src('assets/js/*.js')
  .pipe(uglify())
  .pipe(concat('scripts-dir.js'))
  .pipe(gulp.dest('js'))
});

gulp.task('watch', function() {
  gulp.watch('assets/js/*.js', ['js']);
  gulp.watch('assets/ass/**/*.scss', ['sass']);
  gulp.watch('index.html', ['html']);
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload())
});


var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('sass--watch', ['html', 'sass', 'connect', 'watch']);

gulp.task('production', ['html', 'js', 'sass']);
