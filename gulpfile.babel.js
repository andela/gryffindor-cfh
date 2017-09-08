import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-istanbul';
import bower from 'gulp-bower';
import babel from 'gulp-babel';
import FileCache from 'gulp-file-cache';

const isparta = require('isparta');

const fileCache = new FileCache();

gulp.task('sass', () =>
  gulp.src('client/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/css')));

gulp.task('images', () => gulp.src('client/img-assets/**/*')
  .pipe(cache(imagemin({ optimizationLegivel: 5, progressive: true, interlaced: true })))
  .pipe(gulp.dest('public/img')));

gulp.task('server', ['compile'], () =>
  nodemon({
    script: 'dist/server.js',
    watch: 'src',
    tasks: ['compile', 'copyServer']
  })
);
gulp.task('compile', () =>
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(fileCache.cache())
    .pipe(gulp.dest('./dist'))
);

gulp.task('watch', () => {
  gulp.watch('client/js/**/*.js', ['transpile']);
  gulp.watch('client/scss/**/*.scss', ['sass']);
  gulp.watch('client/img-assets/**/*', ['images']);
  gulp.watch('client/views/**/*', ['copyClient']);
  gulp.watch(['src/config/env/**/*.json', 'src/app/views/**/*.jade'], ['copyServer']);
});

gulp.task('coveralls', ['test'], () => gulp.src('./coverage/lcov.info')
  .pipe(coveralls())
  .on('end', () => {
    process.exit();
  }));


gulp.task('pre-test', () => gulp.src(['src/server.js', 'src/app/**/*.js', 'src/config/**/*.js'])
  // Covering files
  .pipe(istanbul({
    instrumenter: isparta.Instrumenter
  }))
  // Force `require` to return covered files
  .pipe(istanbul.hookRequire()));

gulp.task('test', ['pre-test'], () =>
  gulp.src(['test/**/*.js'])
    .pipe(mocha({ reporter: 'spec' }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    .once('error', () => {
      process.exit(1);
    }));

gulp.task('transpile', () => gulp.src(['client/js/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('public/js')));


gulp.task('copyClient', () => {
  // copy misc client files
  gulp.src(['client/css/**'])
    .pipe(gulp.dest('public/css'));
  gulp.src(['client/views/**'])
    .pipe(gulp.dest('public/views'));
  gulp.src(['client/*.txt'])
    .pipe(gulp.dest('public'));
});

gulp.task('copyServer', () => {
  // copy misc server files
  gulp.src(['src/app/views/**/*.jade'])
    .pipe(gulp.dest('dist/app/views'));
  gulp.src(['src/config/env/**/*.json'])
    .pipe(gulp.dest('dist/config/env'));
});

gulp.task('copy', ['copyServer', 'copyClient']);

gulp.task('bower', () => bower());
gulp.task('default', ['sass', 'images', 'watch', 'server', 'bower', 'transpile', 'copy']);
gulp.task('heroku:production', ['sass', 'images', 'bower', 'transpile', 'copy', 'compile']);
