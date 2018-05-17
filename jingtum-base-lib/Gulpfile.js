// gulp jingtum base lib to front enabled js lib
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var bump = require('gulp-bump');
var map = require('map-stream');
var webpack = require('webpack');
var rename = require('gulp-rename');

var pkg = require('./package.json');

var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' 
	+ '<%= new Date().toISOString() %>\n' 
	+ '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' 
	+ '* Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author.name %>;' + ' Licensed <%= pkg.license %> */';

var jssrc = [
    './src/sha512.js',
    './src/utils.js',
    './src/secp256k1.js',
    './src/keypairs.js',
    './src/wallet.js'
];

gulp.task('lint', function() {
    gulp.src(['./src/*/*.js'])
    .pipe(jshint())
    .pipe(map(function(file, callback) {
    	if (!file.jshint.success) {
        	console.log('\nIn', file.path);

            file.jshint.results.forEach(function(err) {
                if (err && err.error) {
                    var col1 = err.error.line + ':' + err.error.character;
                    var col2 = '[' + err.error.reason + ']';
                    var col3 = '(' + err.error.code + ')';

                    while (col1.length < 8) {
                        col1 += ' ';
                    }
                    console.log('  ' + [col1, col2, col3].join(' '));
                }
            });
        }
        callback(null, file);
    }));
});

gulp.task('build', function(callback) {
    webpack({
        cache: true,
        entry: './index.js',
        output: {
            library: 'jingtum_base',
            path: './dist',
            filename: ['jingtum-base-', '.js'].join(pkg.version)
        },
    }, callback);
});

gulp.task('build-min', ['build'], function(callback) {
    var file = ['./dist/jingtum-base-', '.js'].join(pkg.version);
    return gulp.src(file)
        .pipe(uglify())
        .pipe(rename(['jingtum-base', '-min.js'].join(pkg.version)))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-debug', function(callback) {
    webpack({
        cache: true,
        entry: './index.js',
        output: {
            library: 'jingtum_base',
            path: './dist',
            filename: ['jingtum-base-', '-debug.js'].join(pkg.version)
        },
        debug: true,
        devtool: 'eval'
    }, callback);
});

gulp.task('default', ['lint', 'build', 'build-debug', 'build-min']);
