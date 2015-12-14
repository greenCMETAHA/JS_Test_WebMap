var webmap = angular.module('webMapServices', ['ngResource']);

webmap.factory('vacansiesList', ['$resource',
    function($resource){
        return $resource('https://api.hh.ru/vacancies?text=:search', {search:'javaScript'}, {
            query: {method:'GET', params:{}, }
        });
    }]);


//https://api.hh.ru/vacancies?text=javaScript