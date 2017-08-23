var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

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

  gulp.task('server', function() {
    nodemon({
        script: 'server.js',
        watch: ["server.js", "app.js", "routes/", 'public/*', 'public/*/**'],
        ext: 'js'
    }).on('restart', () => {
    gulp.src('server.js')
      .pipe(notify('Running the start tasks'));
  });
});
  gulp.task('watch', function() {
  gulp.watch('public/js/*.js', ['scripts']);
  gulp.watch('public/scss/*.scss', ['sass']);
  gulp.watch('public/images/**/*', ['images']);
 });

 
gulp.task('default', ['scripts','sass', 'images', 'watch', 'server']);
