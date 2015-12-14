'use strict';

var webmap = angular.module('js-test-webmap', [
    'ngRoute',
    'webmapControllers',
    'webMapServices'
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
        when('/mapVacanciesList', {
            templateUrl: 'main/mapVacancies.html',
            controller: 'mapVacanciesListCtrl'
        }).
        otherwise({
            redirectTo: '/table'
        });
    }]);
