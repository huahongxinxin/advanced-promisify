'use strict';

var promisify = require('../main/index');

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
});