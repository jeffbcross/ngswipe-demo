module.exports = function (karma) {
  karma.configure({
    files: [
      'app/scripts/angular/angular.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/components/angular-mobile/*.js',
      'app/components/angular-resource/*.js',
      'app/components/angular-sanitize/*.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'app/views/**.html',
      'test/mock/*.js',
      'test/spec/**/*.js'
    ],
    plugins: [
      'karma-ng-html2js-preprocessor',
      'karma-jasmine',
      'karma-chrome-launcher'
    ],
    frameworks: [
      'jasmine'
    ],
    preprocessors : {
      'views/**.html': 'html2js'
    },
    reporters : ['progress'],
    port : 8080,
    runnerPort : 9100,
    colors : true,
    autoWatch : true,
    browsers : ['Chrome'],
    captureTimeout : 5000,
    singleRun : false
  });
}