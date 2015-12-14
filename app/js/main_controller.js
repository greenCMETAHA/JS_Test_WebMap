'use strict';

    var webmap = angular.module('webmapControllers', []);


    webmap.controller('TableCtrl', ['$scope', 'vacansiesList',
        function($scope, vacansiesList ) {
            vacansiesList.query().$promise.then(function(result){
                $scope.vacancies=result.items;
            })

    //webmap.controller('TableCtrl', ['$scope', '$http', function($scope, $http) {
    //$http.get('https://api.hh.ru/vacancies?text=javaScript').success(function(data) {
    //    $scope.vacancies = data.items;
    //});

}]);



    webmap.controller('MapCtrl', ['$scope', '$http', function($scope, $http) {
        var str="http://hh.ru/shards/searchvacancymap?items_on_page=100&&enable_snippets=true&label=with_address&text=javascript" +
            "&clusters=true&salary=&isMap=true&bottom_left_lat=53.698611658494&bottom_left_lng=26.308946708060958" +
            "&top_right_lat=54.02979493800219&top_right_lng=28.616075614310958&_=1448885030019";
        $http.get(str).success(function(data) {
            $scope.vacancies = data;
        });

    }]);
