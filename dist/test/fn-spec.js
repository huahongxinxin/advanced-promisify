'use strict';

var _ = require('lodash'),
    promisify = require('../main/index');

describe('fn', function () {

    it('basic', function (done) {

        function doSomethingAsync(arg1, arg2, cb) {
            expect(arg1).toBe('arg1');
            expect(arg2).toBe('arg2');
            process.nextTick(function () {
                cb(null, 'result');
            });
        }

        var doSomethingAsyncPromised = promisify.fn(doSomethingAsync);

        doSomethingAsyncPromised('arg1', 'arg2').then(function (result) {
            expect(result).toBe('result');
            done();
        });
    });

    it('return first argument', function (done) {
        function doSomethingAsync(cb) {
            process.nextTick(function () {
                cb(null, 'result1', 'result2');
            });
        }

        var doSomethingAsyncPromised = promisify.fn(doSomethingAsync);

        doSomethingAsyncPromised().then(function (result) {
            expect(result).toBe('result1');
            done();
        });
    });

    it('return arguments', function (done) {
        function doSomethingAsync(cb) {
            process.nextTick(function () {
                cb(null, 'result1', 'result2');
            });
        }

        var doSomethingAsyncPromised = promisify.mfn(doSomethingAsync);

        doSomethingAsyncPromised().then(function (results) {
            expect(_.isArray(results)).toBeTruthy();
            expect(results.length).toBe(2);
            expect(results[0]).toBe('result1');
            expect(results[1]).toBe('result2');
            done();
        });
    });
});