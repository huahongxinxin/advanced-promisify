'use strict';

const
    _ = require('lodash'),
    promisify = require('../main/index');

describe('obj', () => {

    it('inherits', (done) => {
        let that;

        class A {

            doSomethingAsync(arg1, arg2, cb) {
                expect(this).toBeDefined();
                expect(this).toBe(that);
                expect(arg1).toBe('arg1');
                expect(arg2).toBe('arg2');
                process.nextTick(() => {
                    cb(null, 'result');
                })
            }

        }

        class B extends A {}

        const b = that = new B();
        promisify.obj(b);

        b.$doSomethingAsync('arg1', 'arg2')
            .then((result) => {
                expect(result).toBe('result');
                done();
            });

    });

    it('return first argument', (done) => {

        class A {

            doSomethingAsync(cb) {
                process.nextTick(() => {
                    cb(null, 'result1', 'result2');
                })
            }

        }

        const a = new A();
        promisify.obj(a);

        a.$doSomethingAsync()
            .then((result) => {
                expect(result).toBe('result1');
                done();
            });

    });

    it('return arguments', (done) => {

        class A {

            doSomethingAsync(cb) {
                process.nextTick(() => {
                    cb(null, 'result1', 'result2');
                })
            }

        }

        const a = new A();
        promisify.obj(a);

        a.m$doSomethingAsync()
            .then((results) => {
                expect(_.isArray(results)).toBeTruthy();
                expect(results.length).toBe(2);
                expect(results[0]).toBe('result1');
                expect(results[1]).toBe('result2');
                done();
            });

    });

});
