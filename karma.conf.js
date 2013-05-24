basePath = "app/";
files = [
  'scripts/angular/angular.js',
  'components/angular-mocks/angular-mocks.js',
  'components/angular-mobile/*.js',
  'components/angular-resource/*.js',
  'components/angular-sanitize/*.js',
  'scripts/*.js',
  'scripts/angular/angular.js',
  'scripts/controllers/*.js',
  'scripts/directives/*.js',
  'scripts/services/*.js',
  'scripts/filters/*.js',
  '../test/mock/*.js',
  '../test/spec/**/*.js',
  'views/article.html',
  'views/feeds.html',
  'views/io-add-feed-form.html',
  'views/io-article-preview.html'
];
plugins = [
  'karma-ng-html2js-preprocessor',
  'karma-jasmine',
  'karma-chrome-launcher'
];
frameworks = [
  'jasmine'
];
preprocessors = {
  'views/**.html': 'html2js'
};
reporters = ['progress'];
port = 8080;
runnerPort = 9100;
colors = true;
autoWatch = true;
browsers = ['Chrome'];
captureTimeout = 5000;
singleRun = false;