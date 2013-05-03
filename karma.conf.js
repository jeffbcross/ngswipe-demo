module.exports = function (karma) {
  karma.configure({
    basePath: 'app',
    files: [
      'app/components/angular/angular.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/components/angular-mobile/*.js',
      'app/components/angular-resource/*.js',
      'app/components/angular-sanitize/*.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'views/*.html': 'html2js'
    },
    reporters: ['progress'],
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 5000,
    singleRun: false,
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-junit-reporter'
    ]
  });
};
