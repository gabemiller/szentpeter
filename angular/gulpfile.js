var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('gulp-webpack');
var rimraf = require('gulp-rimraf');
var imagemin = require('gulp-imagemin');
var svgo = require('imagemin-svgo');

/**
 * Scss: app.scss
 */
gulp.task('scss', function() {
    gulp.src('./src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});

/**
 * Html: index.html
 */
gulp.task('html', function() {
    gulp.src('./src/view/**/*.html')
        .pipe(gulp.dest('./dist'));
});

/**
 * Image Optimaze
 */
gulp.task('image-optimize', function () {
    return gulp.src('./src/images/*.{gif,jpg,png,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('image-clean', function () {
    return gulp.src('./dist/images/*.*', {read: false})
        .pipe(rimraf());
});

gulp.task('image', ['image-clean', 'image-optimize']);

/**
 * Webpack: boot.ts
 */
gulp.task('webpack',function () {

    var config = require('./webpack.config.js');

    config.output.filename = 'boot.js';

    return gulp.src('./src/typescript/boot.ts')
        .pipe(webpack(config))
        .pipe(gulp.dest('./dist/js'));
});

/**
 * Webpack: polyfills.ts
 */
gulp.task('polyfills',function () {

    var config = require('./webpack.config.js');

    config.output.filename = 'polyfills.js';

    return gulp.src('./src/typescript/polyfills.ts')
        .pipe(webpack(config))
        .pipe(gulp.dest('./dist/js'));
});

/**
 * Webpack: vendor.ts
 */
gulp.task('vendor',function () {

    var config = require('./webpack.config.js');

    config.output.filename = 'vendor.js';

    return gulp.src('./src/typescript/vendor.ts')
        .pipe(webpack(config))
        .pipe(gulp.dest('./dist/js'));
});

/**
 *  Gulp watch
 */
gulp.task('watch', function () {
    gulp.watch('src/typescript/app/**/*.ts', ['webpack']);
    gulp.watch('src/view/**/*.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/images/**/*.*', ['image']);
});

/**
 * Gulp Init
 */
gulp.task('init', ['html', 'scss', 'polyfills', 'vendor', 'webpack', 'image','watch']);