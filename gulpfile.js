var gulp = require('gulp');
var sass = require('gulp-sass');
var serve = require('gulp-serve');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssbeautify = require('gulp-cssbeautify');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');


gulp.task('clean-css', function () {
    gulp.src('./src/assets/css', {read: false})
        .pipe(clean());
});

gulp.task('clean-js', function () {
    gulp.src('./src/dist/**/*.js', {read: false})
        .pipe(clean());
});

gulp.task('clean-html', function () {
    gulp.src('./src/dist/**/*.html', {read: false})
        .pipe(clean());
});

gulp.task('sass', ['clean-css'], function () {
    gulp.src('./src/sass/**/*.scss',{base: './src/sass'})
        .pipe(sass())
        .pipe(cssbeautify())
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(livereload());
});


gulp.task('angularScript', ['clean-js'], function() {
    gulp.src('src/angular-app/**/*.js', {base: './src/angular-app'})
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(livereload()); 
});

gulp.task('html', ['clean-html'], function() {
    gulp.src('src/templates/**/*.html', {base: './src/templates'})
        .pipe(gulp.dest('dist'))
        .pipe(livereload()); 
});


// Watch Task
gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/angular-app/**/*.js', ['angularScript']);
  gulp.watch('./src/templates/**/*.html', ['html']);
});


gulp.task('serve', serve('src'));

gulp.task('default',['sass', 'angularScript', 'html' ,'watch', 'serve']);