module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'http://code.angularjs.org/1.4.8/angular.js',
      'http://code.angularjs.org/1.4.8/angular-route.js',
      'http://code.angularjs.org/1.4.8/angular-mocks.js',
      'http://code.angularjs.org/1.4.8/angular-resource.js',
      'http://code.angularjs.org/1.4.8/angular-animate.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};