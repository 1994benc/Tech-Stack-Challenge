var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/'

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  json: appRoot + '**/*.json',
  style: 'styles/**/*.css',
  output: outputRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  dtsSrc: [
    './typings/**/*.d.ts',
    './custom_typings/**/*.d.ts'
  ],
  cucumberStepDefs: 'test/cucumber/features/step_definitions/',
  cucumberFeatures: 'test/cucumber/features/'
}
