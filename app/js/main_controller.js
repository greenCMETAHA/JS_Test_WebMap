'use strict';

    var webmap = angular.module('webmapControllers', []);


    webmap.controller('TableCtrl', ['$scope', 'vacansiesList',
        function($scope, vacansiesList) {

            $scope.loadData = function() {
                var vacansiesTemp = vacansiesList($scope.searchInput).query();
                vacansiesTemp.$promise.then(function(result){
                    $scope.vacancies=result.items;
                });
            }

            $scope.reload = function()
            {
                $scope.loadData();
            };
           // $scope.$watch('searchInput', function (){
           //   $scope.loadData();
           // });

            $scope.loadData();

    //webmap.controller('TableCtrl', ['$scope', '$http', function($scope, $http) {
    //$http.get('https://api.hh.ru/vacancies?text=javaScript').success(function(data) {
    //    $scope.vacancies = data.items;
    //});

    }]);

    webmap.controller('MapCtrl', ['$scope', '$http',
        function($scope, $http) {
    }]);

    webmap.controller('mapVacanciesListCtrl', ['$scope', 'vacansiesList',
        function($scope, vacansiesList) {

            angular.extend($scope, {
                myCity: {
                    autoDiscover: true,
                    //lat: 51.505, lng: -0.09,
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
                    m0: {
                        //lat: 51.505, lng: -0.09, message: "I want to travel here!", focus: true, draggable: false
                    },
                }
            });
            $scope.$watch("myCity.zoom", function(zoom) {
                $scope.tiles.url = (zoom > 10)
                    ? "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    : "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
            });

            $scope.addMarkers = function() {
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

            $scope.removeMarkers = function() {
                $scope.markers = {};
            }

            $scope.addMarkers();

            //++++++++++++++++++++++++++++++++++++++++++++++++++++++



            $scope.loadData = function() {
                var vacansiesTemp = vacansiesList($scope.searchInput).query();
                vacansiesTemp.$promise.then(function(result){
                    $scope.vacancies=result.items;

                    var objMass={};

                    var size=$scope.vacancies.length;
                    for (var i=0; i<size; i++){
                        var currentVacancy=$scope.vacancies[i];
                        if (currentVacancy.address!=null) {
                            if ((currentVacancy.address.lat + currentVacancy.address.lng) > 0) {
                                var nameObj = "marker" + currentVacancy.id;

                                objMass[nameObj]={
                                        lat: currentVacancy.address.lat,
                                        lng: currentVacancy.address.lng,
                                        message: currentVacancy.name + '\n' + currentVacancy.employer.name,
                                        focus: true,
                                        draggable: false
                                    };
                            }
                        }
                      }
                    $scope.markers=objMass;

                });
            }

            //$scope.loadData = function () {
            //    return $http.get('http://hh.ru/shards/searchvacancymap' +
            //        '?items_on_page=100&&enable_snippets=true&label=with_address&text=' +
            //        'javaScript&clusters=true&salary=&isMap=true&manager_id=12435' +
            //        '&bottom_left_lat=53.698611658494' +
            //        '&bottom_left_lng=26.308946708060958' +
            //        '&top_right_lat=54.02979493800219' +
            //        '&top_right_lng=28.616075614310958' +
            //        '&_=1448885030019').success(function(data) {
            //        $scope.vacancies = data.items;
            //    });
            //}

            $scope.reload = function () {
                $scope.loadData();
            };

            $scope.loadData();
    }]);
//
//webmap.controller('mapVacanciesListCtrl', ['$scope', 'vacansiesListWithParameters',
//    function($scope, vacansiesListWithParameters) {
//
//        $scope.loadData = function () {
//            var vacansiesTemp = vacansiesListWithParameters($scope.searchInput).load();
//            vacansiesTemp.$promise.then(function (result) {
//                $scope.vacancies = result.items;
//            });
//        }
//
//        $scope.reload = function () {
//            $scope.loadData();
//        };
//
//        $scope.loadData();
//    }]);

