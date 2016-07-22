'use strict';

const
    _ = require('lodash'),
    promisify = require('../main/index');

describe('fn', () => {

    it('basic', (done) => {
        
        function doSomethingAsync(arg1, arg2, cb) {
            expect(arg1).toBe('arg1');
            expect(arg2).toBe('arg2');
            process.nextTick(() => {
                cb(null, 'result');
            });
        }
        
        const doSomethingAsyncPromised = promisify.fn(doSomethingAsync);
        
        doSomethingAsyncPromised('arg1', 'arg2')
            .then((result) => {
                expect(result).toBe('result');
                done();
            });

    });

    it('return first argument', (done) => {
        function doSomethingAsync(cb) {
            process.nextTick(() => {
                cb(null, 'result1', 'result2');
            });
        }

        const doSomethingAsyncPromised = promisify.fn(doSomethingAsync);

        doSomethingAsyncPromised()
            .then((result) => {
                expect(result).toBe('result1');
                done();
            });
    });

    it('return arguments', (done) => {
        function doSomethingAsync(cb) {
            process.nextTick(() => {
                cb(null, 'result1', 'result2');
            });
        }

        const doSomethingAsyncPromised = promisify.mfn(doSomethingAsync);

        doSomethingAsyncPromised()
            .then((results) => {
                expect(_.isArray(results)).toBeTruthy();
                expect(results.length).toBe(2);
                expect(results[0]).toBe('result1');
                expect(results[1]).toBe('result2');
                done();
            });
    });

});
