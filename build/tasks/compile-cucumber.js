var gulp = require('gulp');
var ts = require('gulp-typescript');
var paths = require('../paths');

gulp.task('compileCucumber', function () {
  return gulp.src(paths.cucumberStepDefs+"*.ts")
    .pipe(ts({
      noImplicitAny: true,
      // outFile: 'output.js',
      target:"ES5",
      module:"umd"
    }))
    .pipe(gulp.dest(paths.cucumberStepDefs));
});
