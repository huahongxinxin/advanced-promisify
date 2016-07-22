'use strict';

var _ = require('lodash'),
    getAllPropertyNames = require('property-names'),
    promisify = require('./promisify');

// reference to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
var IGNORE_METHODS = ['constructor', '__defineGetter__', '__defineSetter__', '__lookupGetter__', '__lookupSetter__', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toSource', 'toString', 'unwatch', 'valueOf', 'watch'];

var advancedPromisify = exports;

advancedPromisify.fn = function (fn) {
    return promisify(fn);
};

advancedPromisify.mfn = function (fn) {
    return promisify(fn, {
        multiArgs: true
    });
};

advancedPromisify.cls = function (C) {
    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '$' : arguments[1];

    advancedPromisify.obj(C.prototype, prefix);
};

advancedPromisify.obj = function (obj) {
    var prefix = arguments.length <= 1 || arguments[1] === undefined ? '$' : arguments[1];

    _.forEach(_.filter(getAllPropertyNames(obj), function (p) {
        return _.findIndex(IGNORE_METHODS, p) === -1 && _.isFunction(obj[p]);
    }), function (m) {
        obj['' + prefix + m] = promisify(obj[m]);
        obj['m' + prefix + m] = promisify(obj[m], {
            multiArgs: true
        });
    });
};