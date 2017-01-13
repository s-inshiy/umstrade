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

// SCSS
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sasstocss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./src/css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(bsync.stream())
});

// JS
gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./src/js'))
})


// Browser Sync 
gulp.task('serve', ['sass'], function() {
    bsync.init({
        server: {
            baseDir: './'
        },
    })
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']).on('change', bsync.reload);
    gulp.watch('./*.html').on('change', bsync.reload);
})
