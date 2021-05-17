"use strict";
exports.__esModule = true;
exports.gte = exports.neq = exports.gt = exports.lte = exports.eq = exports.lt = exports.sortByLazy = exports.sortBy = void 0;
// LICENSE = MIT
var index_1 = require("./index");
exports.sortBy = function (ary, fn) {
    return ary
        .map(function (val, idx) { return ({ val: val, idx: idx, key: fn(val, idx) }); })
        .sort(function (a, b) { return index_1.cmp(a.key, b.key) || index_1.cmp(a.idx, b.idx); })
        .map(function (obj) { return obj.val; });
};
exports.sortByLazy = function (ary) {
    var fns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        fns[_i - 1] = arguments[_i];
    }
    return ary.sort(function (a, b) {
        var c = 0;
        for (var i = 0; i < fns.length; i++) {
            var fn = fns[i];
            c = index_1.cmp(fn(a), fn(b));
            if (c !== 0) {
                break;
            }
        }
        return c;
    });
};
exports.lt = function (a, b) { return index_1.cmp(a, b) === -1; };
exports.eq = function (a, b) { return index_1.cmp(a, b) === 0; };
exports.lte = function (a, b) { return index_1.cmp(a, b) !== 1; };
exports.gt = function (a, b) { return index_1.cmp(a, b) === 1; };
exports.neq = function (a, b) { return index_1.cmp(a, b) !== 0; };
exports.gte = function (a, b) { return index_1.cmp(a, b) !== -1; };
