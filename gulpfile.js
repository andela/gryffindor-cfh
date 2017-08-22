// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src(['public/js/**', 'app/**/*.js'])
      .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});
    gulp.task('sass', function() {
    return sass('public/css/common.scss', {style: 'compressed'})
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});
      gulp.task('images', function() {
  return gulp.src('public/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'));
});
  gulp.task('watch', function() {
   // Watch .js files
  gulp.watch('public/js/*.js', ['scripts']);
   // Watch .scss files
  gulp.watch('public/scss/*.scss', ['sass']);
   // Watch image files
  gulp.watch('public/images/**/*', ['images']);
 });

 // Default Task
gulp.task('default', ['scripts','sass', 'images', 'watch']);
