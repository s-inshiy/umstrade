'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-html-minifier'),
    sasstocss = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    bsync = require('browser-sync').create();

// Compiling SCSS to CSS
gulp.task('sass', function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sasstocss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(bsync.stream())
});

// Getting JS files together and Minifying scripts.js
gulp.task('jsmin', function() {
    return gulp.src('./assets/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'))
})

// Minifying HTML files (in case if it's really needed)
gulp.task('htmlmin', function() {
    gulp.src('./*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist'))
})

// Minifying images
gulp.task('imagemin', function() {
    gulp.src('./assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))

});

// Browser Sync session
gulp.task('bsync', ['sass'], function() {
    bsync.init({
        server: {
            baseDir: './'
        },
    })
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
    gulp.watch('./assets/js/**/*.js', ['jsmin']).on('change', bsync.reload);
    gulp.watch('./*.html').on('change', bsync.reload);
})
