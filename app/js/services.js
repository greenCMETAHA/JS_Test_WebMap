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


//
//myApp.factory("PropertyDb", function($resource, $log) {
//    return {
//        getProperties: function(parameter, onSuccess) {
//            var properties = $resource("http://myurl.com/get_properties.php?", {
//                    callback: 'JSON_CALLBACK',
//                    postcode: parameter.postcode,
//                    minimum_beds: '3',
//                    minimum_price: '97500'
//                },
//
//                {
//                    fetch : {method:'JSONP'},
//                    params:  parameter
//                });
//
//            properties.fetch(
//                function success(response) {
//                    console.log(response);
//                    onSuccess(response.listing);
//                },
//                function error(response) {
//                    console.log(response);
//                    console.log("error");
//                }
//            );
//        },
//        /*...*/
//    }
//});


//https://api.hh.ru/vacancies?text=javaScript