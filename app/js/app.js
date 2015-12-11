'use strict';

var webmap = angular.module('js-test-webmap', [
    'ngRoute',
    'webmapControllers'
]);

webmap.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/table', {
            templateUrl: 'main/table.html',
            controller: 'TableCtrl'
        }).
        when('/map', {
            templateUrl: 'main/map.html',
            controller: 'MapCtrl'
        }).
        otherwise({
            redirectTo: '/table'
        });
    }]);
