var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var serve = require('gulp-serve');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssbeautify = require('gulp-cssbeautify');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

var cssPath = './src/assets/css';
var jsPath = './dist/**/*.js';
var htmlPath = './dist/**/*.html';

gulp.task('clean-css', function() {
    gulp.src(cssPath + "/**/*.css", {
            read: false,
        })
        .pipe(clean());

    gulp.src(cssPath, {
            read: false,
        })
        .pipe(clean());
});


gulp.task('clean-js', function() {
    gulp.src(jsPath, {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-html', function() {
    gulp.src(htmlPath, {
            read: false,
            base: './dist'
        })
        .pipe(clean());
});

gulp.task('sass', ['clean-css'], function() {
    gulp.src('./src/sass/**/*.scss', {
            base: './src/sass'
        })
        .pipe(sass())
        .pipe(cssbeautify())
        .pipe(gulp.dest('./src/assets/css'))
        .pipe(livereload());
});


gulp.task('angularScript', ['clean-js'], function() {
    gulp.src('src/angular-app/**/*.js', {
            base: './src/angular-app'
        })
        .pipe(concat("all.js"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('html', ['clean-html'], function() {
    gulp.src('src/templates/**/*.html', {
            base: './src/templates'
        })
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

gulp.task('default', ['sass', 'angularScript', 'html', 'watch', 'serve']);
