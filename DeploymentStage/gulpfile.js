/// <binding BeforeBuild='default' />
/**
 * Created by Javed on 8/15/2015.
 */
'use strict';

var gulp = require('gulp'),
    gprint = require('gulp-print'),
    runSequence = require('run-sequence'),
    bundle = require('gulp-concat'),
    minify = require('gulp-uglify'),
    rename = require('gulp-rename');

var paths = {
    "JSDest": 'App/',
    "JSCompiled": 'Scripts/',
    "BowerSrc": "bower_components/"
}

var config = {
    "BowerFiles": [
        paths.BowerSrc + 'jquery/dist/jquery.min.js',
        paths.BowerSrc + 'angular/angular.min.js'
    ],
    "BundleSrc": [
        paths.JSCompiled + '*.js',
    ],
    "BundleFileName": "ed.bundle.js",
    "MinifyFileName": "ed.bundle.min.js"
}

gulp.task('compile', function () {
    var tsc = gulp
        .src(config.TypeScriptFiles)
        .pipe(gprint())
        .pipe(ts({ "noImplicitAny": true, "removeComments": true }));

    return tsc.js.pipe(gulp.dest(paths.JSCompiled));
});

gulp.task('bower', function () {
    return gulp
        .src(config.BowerFiles)
        .pipe(gprint())
        .pipe(gulp.dest(paths.JSDest));
});

gulp.task('prod_build', function () {
    return gulp
        .src(config.BundleSrc)
        .pipe(bundle(config.BundleFileName))
        .pipe(gprint())
      //  .pipe(rename(config.MinifyFileName))
       // .pipe(minify())
        .pipe(gulp.dest(paths.JSDest));
});

gulp.task('default', function () {
    runSequence('bower', 'prod_build');
});