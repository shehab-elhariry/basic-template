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
  gulp.watch('assets/**/*.scss', ['sass']);
  gulp.watch('./*.html', ['html']);
  gulp.watch('./src/**/*.html', ['htmlpartial']);
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload())
});

const imagemin = require('gulp-imagemin');
gulp.task('compress-img', () =>
  gulp.src('assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'))
);


const htmlPartial = require('gulp-html-partial');

gulp.task('htmlpartial', function () {
  console.log('partial enter')
  gulp.src(['./src/**/*.html'])
    .pipe(htmlPartial({
      basePath: './'
    }))
    .pipe(gulp.dest('./'));
});

var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('sass--watch', ['htmlpartial', 'html', 'sass', 'connect', 'watch']);

gulp.task('production', ['html', 'js', 'sass', 'compress-img']);
