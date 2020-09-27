var gulp = require('gulp');
var paths = require('../paths');
var cucumber = require('gulp-cucumber');
 
gulp.task('cucumber', ['compileCucumber'], function() {
    return gulp.src(paths.cucumberFeatures+"*").pipe(cucumber({
        'steps': paths.cucumberStepDefs+"*.js"
    }));
});
