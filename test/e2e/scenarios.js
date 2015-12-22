'use strict'

describe('Test WebMap', function() {

    beforeEach(function() {
        browser.get('app/index.html');
    });


    it('should redirect index.html to index.html#/table', function () {
        browser.get('app/index.html');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/mapVacanciesList');
        });
    });

    it('should redirect index.html to index.html#/map', function () {
        browser.get('app/index.html#/map');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/map');
        });
    });

    it('should redirect index.html to index.html#/mapVacanciesList', function () {
        browser.get('app/index.html#/mapVacanciesList');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/mapVacanciesList');
        });
    });

    it('the input box should go away on submit', function() {
        element(by.model('searchInput')).sendKeys('java');
    });

    it('the input box should go away on submit', function() {
        element(by.model('searchInput')).sendKeys('javaScript');
    });

    it('should be possible to control vacancies list', function() {
        var vacList = element.all(by.repeater('vacancy in vacancies'));
        var query = element(by.model('searchInput'));

        expect(vacList.count()).toBe(300);

        query.sendKeys('java');
        expect(vacList.count()).toBe(300);

        query.clear();
        query.sendKeys('javaScript');
        expect(vacList.count()).toBe(300);
    });


})