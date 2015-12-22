var webmap = angular.module('webMapServices', ['ngResource']);

webmap.factory('vacansiesList', ['$resource',
    function($resource){
        return function (txtSearch,bounds) {
            var txt='https://api.hh.ru/vacancies?' +
                'text=:search&' +
                'clusters=true' +
                '&isMap=true&' +
                'items_on_page=100&' +
                'enable_snippets=true&' +
                'label=with_address&' +
                'bottom_lat=:latLeft&' +
                'left_lng=:lngLeft&'+
                'top_lat=:latRight&' +
                'right_lng=:lngRight&' +
                'per_page=300';

            return $resource(txt,{}, {
                query: {method: 'GET',params:{search: txtSearch, latLeft:bounds.southWest.lat
                        , lngLeft: bounds.southWest.lng, latRight:bounds.northEast.lat
                        , lngRight:bounds.northEast.lng}
                }
            });
        }
    }]);

