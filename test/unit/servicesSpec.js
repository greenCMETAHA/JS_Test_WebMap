'use strict';

describe('service', function() {

    beforeEach(module('js-test-webmap'));

     //Test service availability
    it('check the existence of vacansiesList factory',
        inject(function(vacansiesList) {
            expect(vacansiesList).toBeDefined();
    }));
});
