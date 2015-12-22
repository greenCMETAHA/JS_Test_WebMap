'use strict'

describe('Test WebMap', function() {

    beforeEach(function() {
        browser.get('app/index.html');
    });


    it('should redirect index.html to index.html#/table', function () {
        browser.get('app/index.html');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/table');
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

        var result =(vacList.count()>20?true:false);

        expect().toBe(true);

        query.sendKeys('java');
        result =(vacList.count()>20?true:false);
        expect(result).toBe(true);

        query.clear();
        query.sendKeys('javaScript');
        result =(vacList.count()>20?true:false);
        expect(result).toBe(true);
    });


})