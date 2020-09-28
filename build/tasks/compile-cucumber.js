var gulp = require('gulp');
var ts = require('gulp-typescript');
var paths = require('../paths');

gulp.task('compileComponents', function () {
  return gulp.src(paths.source).pipe(ts({
    noImplicitAny: true,
    // outFile: 'output.js',
    target: "ES5",
    module: "umd"
  })).pipe(gulp.dest(paths.root))
})

gulp.task('compileCucumber', ['compileComponents'], function () {
  return gulp.src(paths.cucumberStepDefs + "*.ts")
    .pipe(ts({
      noImplicitAny: true,
      // outFile: 'output.js',
      target: "ES5",
      module: "umd"
    }))
    .pipe(gulp.dest(paths.cucumberStepDefs));
});
