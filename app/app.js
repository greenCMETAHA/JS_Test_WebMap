(function(){
	'use strict';

	angular.module('js-test-webmap', [ 'ngRoute','js-test-webmap-main','templates' ])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .otherwise({
	        redirectTo: '/'
	      });
	  });
	  
})();