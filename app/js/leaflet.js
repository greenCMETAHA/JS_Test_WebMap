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


})();