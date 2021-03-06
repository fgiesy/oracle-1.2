'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint');



gulp.task('default', function() {
  gulp.watch('js/**/*.js', ['jshint']);
  gulp.watch('js/**/*.js', ['build-js']);
  gulp.watch('scss/**/*.scss', ['sass']);
});


// Compile Our Sass, Apply vendor prefixes, Minify.
gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
       browsers: ['last 3 versions'],
       cascade: false
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(concat('oracle.css'))
    .pipe(cssnano())
    .pipe(rename('oracle.min.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('scss-lint', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(scsslint());
});

// Lint and hint our JS.
gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Concatenate and Uglify
gulp.task('build-js', function(){
  return gulp.src('js/**/*.js')
    .pipe(concat('oracle.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename('oracle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});
