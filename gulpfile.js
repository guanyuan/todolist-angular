var gulp = require('gulp');
var sass = require('gulp-sass');
var serve = require('gulp-serve');
var concat = require('gulp-concat');
var cssbeautify = require('gulp-cssbeautify');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('./src/assets/css', {read: false})
        .pipe(clean());
});

gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss',{base: './src/sass'})
        .pipe(sass())
        .pipe(cssbeautify())
        .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('serve', serve('src'));

gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});


gulp.task('default',['serve', 'clean','sass', 'watch']);