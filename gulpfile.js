const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-ruby-sass');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

gulp.task('scripts', () => gulp.src(['public/js/**', 'app/**/*.js'])
  .pipe(concat('main.js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('build/js')));
gulp.task('sass', () => sass('public/css/common.scss', { style: 'compressed' })
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('build/css')));
gulp.task('images', () => gulp.src('public/img/**/*')
  .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
  .pipe(gulp.dest('build/img')));

gulp.task('server', () => {
  nodemon({
    script: 'server.js',
    watch: ['server.js', 'app.js', 'routes/', 'public/*', 'public/*/**'],
    ext: 'js'
  }).on('restart', () => {
    gulp.src('server.js')
      .pipe(notify('Running the start tasks'));
  });
});
gulp.task('test', () => {
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});
gulp.task('watch', () => {
  gulp.watch('public/js/*.js', ['scripts']);
  gulp.watch('public/scss/*.scss', ['sass']);
  gulp.watch('public/images/**/*', ['images']);
});


gulp.task('default', ['scripts', 'sass', 'images', 'watch', 'server']);
