var webmap = angular.module('webMapServices', ['ngResource']);

webmap.factory('vacansiesList', ['$resource',
    function($resource){
        return function (txtSearch) {
            return $resource('https://api.hh.ru/vacancies?text=:search',{}, {
                query: {method: 'GET',params:{search: txtSearch},}
            });
         }
    }]);

/*
phonecatServices.factory('Phone', ['$resource',
    function($resource){
        return $resource('lib/phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]);*/

//https://api.hh.ru/vacancies?text=javaScript