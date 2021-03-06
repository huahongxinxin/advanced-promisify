'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash'),
    promisify = require('../main/index');

describe('obj', function () {

    it('inherits', function (done) {
        var that = void 0;

        var A = function () {
            function A() {
                _classCallCheck(this, A);
            }

            _createClass(A, [{
                key: 'doSomethingAsync',
                value: function doSomethingAsync(arg1, arg2, cb) {
                    expect(this).toBeDefined();
                    expect(this).toBe(that);
                    expect(arg1).toBe('arg1');
                    expect(arg2).toBe('arg2');
                    process.nextTick(function () {
                        cb(null, 'result');
                    });
                }
            }]);

            return A;
        }();

        var B = function (_A) {
            _inherits(B, _A);

            function B() {
                _classCallCheck(this, B);

                return _possibleConstructorReturn(this, Object.getPrototypeOf(B).apply(this, arguments));
            }

            return B;
        }(A);

        var b = that = new B();
        promisify.obj(b);

        b.$doSomethingAsync('arg1', 'arg2').then(function (result) {
            expect(result).toBe('result');
            done();
        });
    });

    it('return first argument', function (done) {
        var A = function () {
            function A() {
                _classCallCheck(this, A);
            }

            _createClass(A, [{
                key: 'doSomethingAsync',
                value: function doSomethingAsync(cb) {
                    process.nextTick(function () {
                        cb(null, 'result1', 'result2');
                    });
                }
            }]);

            return A;
        }();

        var a = new A();
        promisify.obj(a);

        a.$doSomethingAsync().then(function (result) {
            expect(result).toBe('result1');
            done();
        });
    });

    it('return arguments', function (done) {
        var A = function () {
            function A() {
                _classCallCheck(this, A);
            }

            _createClass(A, [{
                key: 'doSomethingAsync',
                value: function doSomethingAsync(cb) {
                    process.nextTick(function () {
                        cb(null, 'result1', 'result2');
                    });
                }
            }]);

            return A;
        }();

        var a = new A();
        promisify.obj(a);

        a.m$doSomethingAsync().then(function (results) {
            expect(_.isArray(results)).toBeTruthy();
            expect(results.length).toBe(2);
            expect(results[0]).toBe('result1');
            expect(results[1]).toBe('result2');
            done();
        });
    });
});