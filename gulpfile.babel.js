import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sass from 'gulp-ruby-sass';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';

gulp.task('scripts', () => gulp.src(['public/js/**'])
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
    watch: ['server.js', 'app/**/*', 'config/**/*'],
    ext: 'js'
  });
});

gulp.task('test', () => {
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});
  
gulp.task('watch', () => {
  gulp.watch('public/js/**/*.js', ['scripts']);
  gulp.watch('public/scss/*.scss', ['sass']);
  gulp.watch('public/images/**/*', ['images']);
});


gulp.task('default', ['scripts', 'sass', 'images', 'watch', 'server']);
