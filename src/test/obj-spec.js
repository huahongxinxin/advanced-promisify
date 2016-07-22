'use strict';

const promisify = require('../main/index');

describe('obj', () => {

    it('inherits', (done) => {

        class A {

            doSomethingAsync(arg1, arg2, cb) {
                expect(arg1).toBe('arg1');
                expect(arg2).toBe('arg2');
                process.nextTick(() => {
                    cb(null, 'result');
                })
            }

        }

        class B extends A {}

        const b = new B();
        promisify.obj(b);

        b.$doSomethingAsync('arg1', 'arg2')
            .then((result) => {
                expect(result).toBe('result');
                done();
            });

    });

});
