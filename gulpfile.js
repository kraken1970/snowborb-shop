const gulp = require('gulp');
const gutil = require('gulp-util');
const connect = require('gulp-connect');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');

const processors = [
  require('postcss-partial-import')(),  
  require('autoprefixer')(['> 1%', 'last 8 versions', 'ie 9']),  
  require('postcss-nested'),  
  require('postcss-simple-vars'),  
  require('postcss-flexbugs-fixes'),
  require('postcss-flexibility'),
  require('postcss-color-function'),
  require('postcss-short'),
  require('postcss-extend'),
  require('postcss-mixins'),
];

gulp.task('connect', function () {
  connect.server({
    root: 'src',
    livereload: true,
    port: 3000
  });
});

gulp.task('styles', function () {
  return gulp.src('src/assets/styles/app.css')
    .pipe(plumber({ errorHandler: notify.onError({ message: "Error: <%= error.message %>", sound: false }) }))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(rename('assets/styles/style.css'))
    .pipe(gulp.dest('src'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(plumber({ errorHandler: notify.onError({ message: "Error: <%= error.message %>", sound: false }) }))
    .pipe(connect.reload());
});

gulp.task('assets-deploy', function () {
  gulp.src(['src/assets/images/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('styles-deploy', function () {
  return gulp.src('src/assets/styles/app.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', gutil.log)
    .pipe(cssnano())
    .pipe(rename('assets/styles/style.css'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('html-deploy', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));

  gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('clean', function () {
  del('dist');
});

gulp.task('default', ['connect', 'styles'], function () {
  gulp.watch('src/assets/**/*', ['styles']);
  gulp.watch('src/*.html', ['html']);
});

gulp.task('build', ['clean'], function () {
  gulp.start('assets-deploy', 'styles-deploy', 'html-deploy');
});