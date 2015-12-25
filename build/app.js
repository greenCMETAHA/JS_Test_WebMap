( function () {
    'use strict';


var webmap = angular.module('js-test-webmap', [
    'ngRoute',
    'webmapControllers',
    'webMapServices',
    'leaflet'
]);

webmap.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/table', {
                templateUrl: 'main/table.html',
                controller: 'TableCtrl'
            })
            .when('/map', {
                templateUrl: 'main/map.html',
                controller: 'MapCtrl'
            })
            .when('/mapVacanciesList', {
                templateUrl: 'main/mapVacancies.html',
                controller: 'mapVacanciesListCtrl'
            })
            .otherwise({
                redirectTo: '/mapVacanciesList'
            });
    }]);

})();
;/* раздел */ 
( function () {
'use strict';

/* Filters */

angular.module('phonecatFilters', []).filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});

})();
;/* раздел */ 
( function () {
'use strict';

var webmap = angular.module('leaflet', ['leaflet-directive']);

webmap.controller("BasicCenterController", ["$scope", function ($scope) {
    angular.extend($scope, {
        myCity: {
            lat: 51.505,
            lng: -0.09,
            zoom: 11
        },

        tiles: {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        },
        layers: {
            baselayers: {
                osm: {
                    name: 'OpenStreetMap',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                }
            }
        },
        defaults: {
            zoomAnimation: false,
            markerZoomAnimation: false,
            fadeAnimation: false
        },
        markers: {
            m0: {},
        }
    });
    $scope.$watch("myCity.zoom", function (zoom) {
        $scope.tiles.url = (zoom > 10) ? "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            : "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
    });

    $scope.addMarkers = function () {
        angular.extend($scope, {
            markers: {
                m1: {
                    lat: 51.505,
                    lng: -0.09,
                    message: "I'm a static marker",
                },
                m2: {
                    lat: 51,
                    lng: 0,
                    //focus: true,
                    message: "Hey, drag me if you want",
                    draggable: true
                },
            }
        });
    };

    $scope.removeMarkers = function () {
        $scope.markers = {};
    };

    $scope.addMarkers();
    //$scope.myCity.zoom=12;
}]);


})();;/* раздел */ 
( function () {
'use strict';

var webmap = angular.module('webmapControllers', []);

webmap.controller('TableCtrl', ['$scope', 'vacansiesList',
    function ($scope, vacansiesList) {

        var bounds = {
            northEast: {
                lat: 53.99767941971407,  //Minsk
                lng: 27.770004272460938
            },
            southWest: {
                lat: 53.803489443287994,
                lng: 27.289352416992188
            }
        };

        $scope.loadData = function () {
            vacansiesList($scope.searchInput, bounds)
                .query()
                .$promise.then(function (result) {
                $scope.vacancies = result.items;
            });
        };

        $scope.reload = function () {
            $scope.loadData();
        };

        $scope.loadData();
    }]);

webmap.controller('MapCtrl', ['$scope', '$http',
    function ($scope, $http) {
    }]);

webmap.controller('mapVacanciesListCtrl', ['$scope', 'vacansiesList',
    function ($scope, vacansiesList) {

        var bounds = {
            northEast: {
                lat: 53.99767941971407,
                lng: 27.770004272460938
            },
            southWest: {
                lat: 53.803489443287994,
                lng: 27.289352416992188
            },
            zoom: 11
        };

        angular.extend($scope, {
            bounds: bounds,
            center: {},
            layers: {
                baselayers: {
                    osm: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    }
                },
                overlays: {
                    locationsVacancies: {
                        name: 'vacanciesLayer',
                        type: 'markercluster',
                        visible: true
                    },

                    Second: {
                        name: 'vacancies',
                        type: 'markercluster',
                        visible: true
                    }
                },
            },
            markers: {},
            events: {
                map: {
                    enable: ['moveend', 'zoomend', 'dragend'],
                    logic: 'emit'
                }
            }
        });
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++
        function getBounds(event, leafletEvent) {
            var currentBounds = leafletEvent.leafletEvent.target.getBounds();

            $scope.bounds.northEast = currentBounds.getNorthEast();
            $scope.bounds.southWest = currentBounds.getSouthWest();
            $scope.loadData();
        }

        $scope.$on('leafletDirectiveMap.zoomend', getBounds);
        $scope.$on('leafletDirectiveMap.moveend', getBounds);
        $scope.$on('leafletDirectiveMap.dragend', getBounds);

        $scope.loadData = function () {
            vacansiesList($scope.searchInput, $scope.bounds)
                .query()
                .$promise.then(function (result) {
                $scope.vacancies = result.items;

                var objMass = {};

                var size = $scope.vacancies.length;
                for (var i = 0; i < size; i++) {
                    var currentVacancy = $scope.vacancies[i];
                    if (currentVacancy.address !== null) {
                        if ((currentVacancy.address.lat + currentVacancy.address.lng) > 0) {
                            var nameObj = "marker" + currentVacancy.id;

                            objMass[nameObj] = {
                                lat: currentVacancy.address.lat,
                                lng: currentVacancy.address.lng,
                                layer: 'Second',
                                message: currentVacancy.name.trim() + '\n' + currentVacancy.employer.name.trim(),
                                //focus: true,
                                draggable: false
                            };
                        }
                    }
                }
                $scope.markers = objMass;

            });
        };

        $scope.reload = function () {
            $scope.loadData();
        };

        $scope.loadData();
    }]);

webmap.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

})();;/* раздел */ 
( function () {
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
                    query: {method: 'GET',params:{search: txtSearch, latLeft:bounds.southWest.lat,
                        lngLeft: bounds.southWest.lng, latRight:bounds.northEast.lat, lngRight:bounds.northEast.lng}

                    }
                });
            };
        }]);

    })();