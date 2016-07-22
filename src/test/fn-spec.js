'use strict';

const promisify = require('../main/index');

describe('fn', () => {

    it('basic', (done) => {
        
        function doSomethingAsync(arg1, arg2, cb) {
            expect(arg1).toBe('arg1');
            expect(arg2).toBe('arg2');
            process.nextTick(() => {
                cb(null, 'result');
            })
        }
        
        const doSomethingAsyncPromised = promisify.fn(doSomethingAsync);
        
        doSomethingAsyncPromised('arg1', 'arg2')
            .then((result) => {
                expect(result).toBe('result');
                done();
            });

    });

});
