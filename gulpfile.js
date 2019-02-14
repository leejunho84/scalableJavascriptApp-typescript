'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
//var options = require('gulp-options');
var builder = require('./server/index.js');

function startWatch(){
    var corejs = path.join(__dirname, "/dist/assets/js/**/*.js");
    var libsjs = path.join(__dirname, "/dist/assets/libs/**/*.js");

    watch([corejs, libsjs], function (file) {
		  builder.upload_js(file, path.join(__dirname, "/dist/assets/"));
    });
}

function mergeMeta(){
	builder.mergeMeta( 'deployPath', path.join(__dirname, "/dist/metadata.xml"), 'dev', 'nike-com');
}
gulp.task('merge-meta', mergeMeta );

//gulp dev --theme=watsons
gulp.task('watch', function(){
    mergeMeta();
    startWatch();
});