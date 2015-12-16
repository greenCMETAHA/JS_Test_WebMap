var webmap = angular.module('webMapServices', ['ngResource']);

webmap.factory('vacansiesList', ['$resource',
    function($resource){
        return function (txtSearch) {
            return $resource('https://api.hh.ru/vacancies?text=:search',{}, {
                query: {method: 'GET',params:{search: txtSearch},}
            });
         }
    }]);

//webmap.factory('vacansiesListWithParameters', ['$resource',
//    function($resource){
//        return function (txtSearch) {
//
//
//
//            return $resource('http://hh.ru/shards/searchvacancymap' +
//                '?items_on_page=100&&enable_snippets=true&label=with_address&text=' +
//                'javaScript&clusters=true&salary=&isMap=true&manager_id=12435' +
//                '&bottom_left_lat=53.698611658494' +
//                '&bottom_left_lng=26.308946708060958' +
//                '&top_right_lat=54.02979493800219' +
//                '&top_right_lng=28.616075614310958' +
//                '&_=1448885030019', { format: 'json', jsoncallback: 'JSON_CALLBACK' },
//                {
//                    load: {
//                        'method': 'JSONP'
//                    }
//                });
//
//
//
//            //return $resource('http://hh.ru/shards/searchvacancymap' +
//            //    '?items_on_page=100&&enable_snippets=true&label=with_address&text=' +
//            //    ':search&clusters=true&salary=&isMap=true&manager_id=12435' +
//            //    '&bottom_left_lat=53.698611658494' +
//            //    '&bottom_left_lng=26.308946708060958' +
//            //    '&top_right_lat=54.02979493800219' +
//            //    '&top_right_lng=28.616075614310958' +
//            //    '&_=1448885030019',{callback: "JSON_CALLBACK", format:'jsonp'}, {
//            //    query: {method: 'JSONP',params:{search: 'java'},}
//
//
//
//                //return $resource('http://hh.ru/shards/searchvacancymap' +
//                //    '?items_on_page=10&text=' +
//                //    ':search',{callback: "JSON_CALLBACK", format:'jsonp'}, {
//                //    query: {method: 'JSONP',params:{search: 'java'},}
//           // });
//        }
//    }]);

/*
phonecatServices.factory('Phone', ['$resource',
    function($resource){
        return $resource('lib/phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]);*/

//https://api.hh.ru/vacancies?text=javaScript