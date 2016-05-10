// taken from:
// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');



gulp.task('less', function () {
  return gulp.src('app/less/**/*.less') // Get source files with gulp.src
    .pipe(less()) // Sends it through a gulp plugin
    .pipe(gulp.dest('app/css')) // Outputs the file in the destination folder
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('jade', function () {
  return gulp.src('app/jade/**/*.jade') // Get source files with gulp.src
    .pipe(jade()) // Sends it through a gulp plugin
    .pipe(gulp.dest('app')) // Outputs the file in the destination folder
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/**/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('cache:clear', function (callback) {
return cache.clearAll(callback)
})

gulp.task('watch', ['browserSync', 'less'] , function (){
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
})

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['less', 'jade', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['build', 'less', 'jade', 'browserSync', 'watch'],
    callback
  )
})



