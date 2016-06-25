var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var css2js = require("gulp-css2js");
var gulpNgConfig = require('gulp-ng-config');

gulp.task('html2js', function () {
  return gulp.src(['./src/*.html'])
    .pipe(minifyHtml())
    .pipe(ngHtml2Js({
      moduleName: "i4mi.templates"
    }))
    .pipe(concat("templates.js"))
    //.pipe(uglify())
    .pipe(gulp.dest("./dist"));
});

gulp.task('css2js', function () {
  return gulp.src("./src/*.css")
    .pipe(css2js())
    .pipe(concat("styles.js"))
    //.pipe(uglify())
    .pipe(gulp.dest("./dist/"));
});

gulp.task('json2js', function () {
  return gulp.src("./src/*.json")
    .pipe(gulpNgConfig('i4mi.defaults'))
    .pipe(concat("defaults.js"))
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('make-bundle', ['del', 'html2js', 'css2js', 'json2js'], function () {
  return gulp.src(['dist/*', './src/*.js'])
    .pipe(concat('i4mi.bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('del-temp-files', ['make-bundle'], function () {
  del(['dist/templates.js','dist/styles.js','dist/defaults.js']);
});

gulp.task('del', function () {
  del(['dist/*']);
});

gulp.task('build', ['del-temp-files']);

gulp.task('default', ['build']);