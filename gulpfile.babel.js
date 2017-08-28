import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sass from 'gulp-ruby-sass';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import coveralls from 'gulp-coveralls';
import exit from 'exit';
import istanbul from 'gulp-istanbul';


// TODO: use browserify to concatinate js files 

gulp.task('scripts', () => gulp.src(['public/js/**'])
  .pipe(concat('main.js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('build/js')));

gulp.task('sass', () => sass('public/scss/*.scss', { style: 'compressed' })
  // .pipe(concat('main.css'))
  // .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('public/css')));

gulp.task('images', () => gulp.src('public/img-assets/**/*')
  .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
  .pipe(gulp.dest('public/img')));

gulp.task('server', () => {
  nodemon({
    script: 'server.js',
    watch: ['server.js', 'app/**/*', 'config/**/*'],
    ext: 'js'
  });
});

gulp.task('watch', () => {
  // gulp.watch('public/js/**/*.js', ['scripts']);
  gulp.watch('public/scss/**/*.scss', ['sass']);
  gulp.watch('public/img-assets/**/*', ['images']);
});

gulp.task('coveralls', ['test'], () => gulp.src('./coverage/lcov.info')
  .pipe(coveralls())
  .pipe(exit()));


gulp.task('pre-test', () => gulp.src(['server.js', 'app/**/*.js', 'config/**/*.js'])
  // Covering files
  .pipe(istanbul())
  // Force `require` to return covered files
  .pipe(istanbul.hookRequire()));

gulp.task('test', ['pre-test'], () =>
  gulp.src(['test/**/*.js'])
    .pipe(mocha({ reporter: 'spec' }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
);

gulp.task('default', ['sass', 'images', 'watch', 'server']);
