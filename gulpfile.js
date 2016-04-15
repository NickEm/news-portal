var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('compile-less', function () {
    gulp.src('public/app/css/less/*.less')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('public/app/css/dist'));
});

gulp.task('uglify-scripts', function () {
    gulp.src('public/app/js/**/*.js')
        .pipe(concat('dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
    gulp.start('compile-less', 'uglify-scripts');

    gulp.watch('public/app/css/less/*.less', function () {
        gulp.start('compile-less');
    });

    gulp.watch('public/app/js/**/*.js', function () {
        gulp.start('uglify-scripts');
    });
});


