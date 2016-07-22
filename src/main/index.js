'use strict';

const
    _ = require('lodash'),
    getAllPropertyNames = require('property-names'),
    promisify = require('es6-promisify');

// reference to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
const IGNORE_METHODS = [
    'constructor',
    '__defineGetter__',
    '__defineSetter__',
    '__lookupGetter__',
    '__lookupSetter__',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toSource',
    'toString',
    'unwatch',
    'valueOf',
    'watch'
];

const advancedPromisify = exports;

advancedPromisify.fn = (fn) => {
    return promisify(fn);
};

advancedPromisify.cls = (C, prefix = '$') => {
    advancedPromisify.obj(C.prototype, prefix);
};

advancedPromisify.obj = (obj, prefix = '$') => {
    _.forEach(_.filter(getAllPropertyNames(obj), (p) => {
        return _.findIndex(IGNORE_METHODS, p) === -1 && _.isFunction(obj[p]);
    }), (m) => {
        obj[`${prefix}${m}`] = promisify(obj[m]);
    });
};
