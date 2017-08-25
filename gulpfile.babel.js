import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sass from 'gulp-ruby-sass';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
=======
// TODO: use browserify to concatinate js files 

>>>>>>> chore/gulp-file-refactored
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
<<<<<<< HEAD
  .pipe(gulp.dest('build/img')));
>>>>>>> Chore/gulp-and-pakage.json-file-refactored
=======
  .pipe(gulp.dest('public/img')));
>>>>>>> chore/gulp-file-refactored

gulp.task('server', () => {
  nodemon({
    script: 'server.js',
    watch: ['server.js', 'app/**/*', 'config/**/*'],
    ext: 'js'
  });
});
<<<<<<< HEAD
gulp.task('test', () =>
    gulp.src(['test/**/*.js'], {read: false}) 
        .pipe(mocha({reporter: 'spec'}))
);
  gulp.task('watch', function() {
  gulp.watch('public/js/*.js', ['scripts']);
=======

gulp.task('test', () => {
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});
  
gulp.task('watch', () => {
<<<<<<< HEAD
  gulp.watch('public/js/**/*.js', ['scripts']);
>>>>>>> Chore/gulp-and-pakage.json-file-refactored
  gulp.watch('public/scss/*.scss', ['sass']);
  gulp.watch('public/images/**/*', ['images']);
 });

 
gulp.task('default', ['scripts','sass', 'images', 'watch', 'server']);
=======
  // gulp.watch('public/js/**/*.js', ['scripts']);
  gulp.watch('public/scss/**/*.scss', ['sass']);
  gulp.watch('public/img-assets/**/*', ['images']);
});


gulp.task('default', ['sass', 'images', 'watch', 'server']);
>>>>>>> chore/gulp-file-refactored
