var gulp = require('gulp');
var ts = require('gulp-typescript');
var paths = require('../paths');

gulp.task('compileComponents', function () {
  return gulp.src(paths.source).pipe(ts({
    noImplicitAny: true,
    experimentalDecorators: true,
    // outFile: 'output.js',
    target: "ES5",
    module: "umd",
    resolveJsonModule: true,

  })).pipe(gulp.dest(paths.output));
});

gulp.task('compileCucumber', ['compileComponents'], function () {
  return gulp.src(paths.cucumberStepDefs + "*.ts")
    .pipe(ts({
      noImplicitAny: true,
      experimentalDecorators: true,
      // outFile: 'output.js',
      target: "ES5",
      module: "umd",
      resolveJsonModule: true,

    }))
    .pipe(gulp.dest(paths.cucumberStepDefs));
});
