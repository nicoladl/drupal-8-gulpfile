'use strict';

var gulp     = require('gulp'),
sassVariables = require('gulp-sass-variables'),
sass         = require('gulp-sass'),
gutil        = require('gulp-util'),
sourcemaps   = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
gulpif       = require('gulp-if'),
concat       = require('gulp-concat'),
minifyCss    = require('gulp-clean-css'),
uglify       = require('gulp-uglify'),
changed      = require('gulp-changed'),
plumber      = require('gulp-plumber'),
rename       = require('gulp-rename'),
imagemin     = require('gulp-imagemin'),
runSequence  = require('run-sequence'),
pngquant     = require('imagemin-pngquant'),
through2     = require('through2'),
jqc          = require('gulp-jquery-closure'),
browserSync  = require('browser-sync').create();

var theme_name = [THEME_NAME];

var basePath = './src',
vendorsPath  = './node_modules',
docroot      = '../docroot/themes/custom/'+theme_name+'/';

var printError = function(task, message) {
gutil.log(gutil.colors.white.bgRed.bold(task), gutil.colors.red(message));
gutil.beep();
};

var printSuccess = function(task, message) {
gutil.log(gutil.colors.white.bgGreen.bold(task), gutil.colors.green(message));
};

// task - sass - STATIC
gulp.task('sass', function () {

  return gulp.src(basePath + '/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: [
      'last 2 versions',
      'Safari >= 7',
      'ie >= 11',
      'iOS >= 8',
      'Android >= 4.4'
    ],
    cascade: false
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(docroot + '/css'))
  .pipe(browserSync.stream());
});

// task - sass - DRUPAL
gulp.task('sass-drupal', function () {

return gulp.src(basePath + '/sass/**/*.scss')
.pipe(sourcemaps.init())
.pipe(sass.sync().on('error', sass.logError))
.pipe(autoprefixer({
  browsers: [
    'last 2 versions',
    'Safari >= 7',
    'ie >= 11',
    'iOS >= 8',
    'Android >= 4.4'
  ],
  cascade: false
}))
.pipe(minifyCss({
  compatibility: 'ie11',
  level: {
    1: {
      specialComments: 0
    }
  }
}))
.pipe(sourcemaps.write('./'))
.pipe(gulp.dest(docroot + '/css'))
.pipe(browserSync.stream());
});

// Compile Js files.
gulp.task('js', function(min) {

  var pathJsSrc = basePath + "/script";

  return gulp.src([
    pathJsSrc + '/app.js',
    pathJsSrc + '/modules/**/*.js'
  ])
  .pipe(plumber())
  .pipe(changed(basePath + '/script/**'))
  .pipe(concat('app.js'))
  //.pipe(jqc({$: true, window: true, document: true, undefined: true}))
  .pipe(uglify())
  .pipe(gulp.dest(docroot + '/js'));
});

// task - bower vendors
gulp.task('vendors', function() {

  var vendors = [
    vendorsPath + '/jquery/dist/jquery.min.js'
  ];

  gulp.src(vendors)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(docroot + '/js/vendors'));
});

// task - image minificator
gulp.task('images', function() {

  return gulp.src(basePath + '/img/**/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest(docroot + '/img'));
});

// task - watch task
gulp.task('watch', ['sass', 'js', 'vendors', 'images'], function() {

  gulp.watch(basePath + '/sass/**/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch(basePath + '/script/**/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch(basePath + '/img/**/*', ['images']).on('change', browserSync.reload);

});

gulp.task('default', ['sass', 'js', 'vendors', 'images']);
