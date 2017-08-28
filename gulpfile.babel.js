import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
<<<<<<< HEAD
import rename from 'gulp-rename';
import sass from 'gulp-sass';
=======
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sass from 'gulp-ruby-sass';
>>>>>>> Chore: Integrate Coveralls code coverage service (#16)
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import coveralls from 'gulp-coveralls';
import exit from 'exit';
import istanbul from 'gulp-istanbul';
import bower from 'gulp-bower';
<<<<<<< HEAD
import babel from 'gulp-babel';
import FileCache from 'gulp-file-cache';

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
    watch: 'server',
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
  gulp.watch(['src/config/env/**/*.json', 'src/app/views/**/*.jade'], ['copyServer']);
=======


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
>>>>>>> Chore: Integrate Coveralls code coverage service (#16)
});

gulp.task('coveralls', ['test'], () => gulp.src('./coverage/lcov.info')
  .pipe(coveralls())
  .pipe(exit()));


<<<<<<< HEAD
gulp.task('pre-test', () => gulp.src(['src/server.js', 'src/app/**/*.js', 'src/config/**/*.js'])
=======
gulp.task('pre-test', () => gulp.src(['server.js', 'app/**/*.js', 'config/**/*.js'])
>>>>>>> Chore: Integrate Coveralls code coverage service (#16)
  // Covering files
  .pipe(istanbul())
  // Force `require` to return covered files
  .pipe(istanbul.hookRequire()));

gulp.task('test', ['pre-test'], () =>
  gulp.src(['test/**/*.js'])
    .pipe(mocha({ reporter: 'spec' }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
<<<<<<< HEAD
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    })
);
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
=======
);
gulp.task('bower', () => bower());
gulp.task('default', ['sass', 'images', 'watch', 'server', 'bower']);
>>>>>>> Chore: Integrate Coveralls code coverage service (#16)
