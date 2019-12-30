'use strict';

const gulp = require('gulp');

const del = require('del')
const sass = require('gulp-sass');
const webpack = require("webpack");
const webpackstream = require("webpack-stream");
const rimraf   = require('rimraf');
const pkgjson = require('./package.json');

var config = {
    pkg: pkgjson,
    src: './src',
    libs: './node_modules',
    build: './build',
    dist: '../assets'
}

// Clean task
gulp.task('clean', function() {
    return del([
        config.dist + '/fonts', 
        config.dist + '/css', 
        config.dist + '/js'
    ], {force: true});
});

//Fonts task
gulp.task('fonts', function() {
    return gulp.src([
        config.libs + '/simple-line-icons/fonts/**.*',
    ])
    .pipe(gulp.dest(config.dist + '/fonts'));
});

//CSS task
gulp.task('css', function() {
    return gulp.src(config.src + '/sass/frontend.scss')
    .pipe(sass({
        sourceComments: false,
        outputStyle: 'compressed',
        includePaths: [
            config.libs + '/bootstrap/scss',
            config.libs + '/simple-line-icons/scss',
        ],
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('webpack', function() {
    return gulp.src('./src/js/frontend.js')
    .pipe(webpackstream({
        resolve: {
            extensions: ['.js', '.json'],
            modules: [
                'node_modules',
                './src/js',
            ]
        },
        entry: {
            app: './src/js/frontend.js',
            libraries: [
                'react',
                'react-dom',
                'react-router-dom',
                'chart.js'
            ]
        },
        output: {
            filename: 'frontend.bundle.js'
        },
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(vendor|node_modules|dist)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'libraries',
                filename: 'libraries.bundle.js',
                minChunks: function (module) {
                  return module.context && module.context.includes('node_modules');
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                compress: {
                    warnings: false,
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    screw_ie8: true
                },
                output: {
                    comments: false,
                },
            }),
            new webpack.optimize.AggressiveMergingPlugin()
        ]
    }))
    .pipe(gulp.dest(config.dist + '/js'));
});

//Watch task
gulp.task('watch',function() {
    gulp.watch(config.src + '/**/*.scss',['css']);
    gulp.watch(config.src + '/**/*.js', ['webpack']);
});

//Build task
gulp.task('build', ['clean'], function() {
    gulp.start(['fonts', 'css', 'webpack']);
});
