// Include gulp
var gulp = require('gulp-help')(require('gulp'));

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var styledocco = require('gulp-styledocco');

// Lint our JS
gulp.task('lint', 'Lints all server-side js', function() {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', 'Compiles SCSS to CSS, minifies theme.css', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(concat('spectacles.css'))
        .pipe(minifyCSS())
        .pipe(rename('spectacles.min.css'))
        .pipe(gulp.dest('./css/'));
});

// Concatenate & Minify JS
gulp.task('scripts', 'Concatenate and minifies JS using JS Uglify', function() {
    return gulp.src('js/**/*.js')
        .pipe(concat('spectacles.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('spectacles.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// Compress Images (wrapped in gulp-cache to ensure only new/changed images are compressed)
gulp.task('images', 'Compress images -only new or changed', function() {
    return gulp.src('/images/*')
        .pipe(cache(imagemin({ optimizationLevel:5, progressive:true, interlaced: true})))
        .pipe(gulp.dest('build/img'));
});

// Watch Files For Changes
gulp.task('watch', 'Watches JS and SCSS files for changes', function() {
    gulp.watch('js/**/*.js', ['lint', 'scripts']);
    gulp.watch('scss/**/*.scss', ['sass']);
});

// Create our Living Styleguide using Styledocco
//gulp.task('styledocco', 'Creates a living styleguide using markdown', function() {
  // gulp.src('css/*.css')
    //   .pipe(styledocco({
      //     out: 'docs',
        //   name: 'Hub',
          // 'no-minify' : true
       //}));
// });

// Default Task
gulp.task('watch', 'Run gulp to lint, compile, minify and watch project files.', ['sass', 'watch']);
gulp.task('push', 'Run Gulp to lint, minify and uglify JS before pushing', ['lint' , 'scripts']);