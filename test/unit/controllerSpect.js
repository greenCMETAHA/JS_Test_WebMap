'use strict';

/* jasmine specs for controllers go here */
describe('WebMap controllers', function() {
    var objectToTest;
    var $httpBackend;
    var scope, ctrl;

    var $controller;
    var responseData={
        name: 'Производитель',
        salary: {
            currency: 'USD',
            from: 500,
            to: 1000
        },
        snippet: {
            requirement: "Производить всё",
            responsibility: "и не смотря ни на что"
        },
        area: {
            name: 'Minsk'
        },
        employer: {
            name: 'Рога и копыта OOO'
        },
        address: {
            street: 'Героев выборной комиссии',
            lat: 54,
            lng: 28
        }
    };

    beforeEach(function(){
        module('leaflet');
        module('ngRoute');
        module('webmapControllers');
        module('webMapServices');
    });


    beforeEach(inject(function (_$httpBackend_, $rootScope, _$controller_){
        //debugger;
        scope = $rootScope.$new();
        scope.vacancies=[];

        $controller = _$controller_;
    }));

    describe('TableCtrl', function() {

        it('should create "TableCtrl" model with 1 vacancy', function() {
            var scope = {};
            scope.vacansiesList=[responseData];
            var ctrl = $controller('TableCtrl', { $scope: scope });
            scope.loadData();
            expect(scope.vacansiesList.length).toBe(1);
        });

        //Те, что, вроде, работали
        it('should create "tableCtrl" model with 1 vacancy', function () {
            var scope = {vacansiesList: [responseData]};
            var ctrl = $controller('MapCtrl', {$scope: scope});

            expect(scope.vacansiesList.length).toBe(1);
        });


        it('should create "MapCtrl" model with 0 vacancies', function () {
            var scope = {vacansiesList: []};
            var ctrl = $controller('MapCtrl', {$scope: scope});

            expect(scope.vacansiesList.length).toBe(0);
        });

        it('should create "manVacancies" model with 1 vacancy', function() {
            var scope = {};
            scope.vacansiesList=[responseData];
            var ctrl = $controller('mapVacanciesListCtrl', { $scope: scope });
            scope.searchInput='java';
            scope.loadData();
            expect(scope.vacansiesList.length).toBe(1);
        });
    });
})
