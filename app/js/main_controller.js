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
                    locations: {
                        name: 'vacanciesLayer',
                        type: 'markercluster',
                        visible: true
                    }
                }
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
                    if (currentVacancy.address != null) {
                        if ((currentVacancy.address.lat + currentVacancy.address.lng) > 0) {
                            var nameObj = "marker" + currentVacancy.id;

                            objMass[nameObj] = {
                                lat: currentVacancy.address.lat,
                                lng: currentVacancy.address.lng,
                                layer: 'locations',
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
