var gulp = require('gulp');
var sass = require('gulp-sass');
var serve = require('gulp-serve');
var concat = require('gulp-concat');
var cssbeautify = require('gulp-cssbeautify');

gulp.task('sass', function () {
    gulp.src('./app/sass/main.scss')
        .pipe(sass())
        .pipe(cssbeautify())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('serve', serve('app'));

gulp.task('watch', function() {
  gulp.watch('./app/sass/*.scss', ['sass']);
});


gulp.task('default',['serve', 'sass', 'watch']);