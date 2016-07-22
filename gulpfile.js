'use strict';

const
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    gulp = require('gulp'),
    jasmineNode = require('gulp-jasmine-node'),
    runSequence = require('run-sequence');

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('build-only', function () {
    return gulp.src('src/**')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function (cb) {
    runSequence('clean', 'build-only', cb);
});

gulp.task('test-only', function () {
    return gulp.src(['dist/test/**/*-spec.js']).pipe(jasmineNode({
        timeout: 10000,
        includeStackTrace: true,
        color: true
    }));
});

gulp.task('test', function (cb) {
    runSequence('build', 'test-only', cb);
});
