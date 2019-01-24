"use strict";
exports.__esModule = true;
// LICENSE = MIT
var index_1 = require("./index");
exports.sortBy = function (ary, fn) {
    return ary
        .map(function (val, idx) { return ({ val: val, idx: idx, key: fn(val, idx) }); })
        .sort(function (a, b) { return index_1.cmp(a.key, b.key) || index_1.cmp(a.idx, b.idx); })
        .map(function (obj) { return obj.val; });
};
exports.lt = function (a, b) { return index_1.cmp(a, b) === -1; };
exports.eq = function (a, b) { return index_1.cmp(a, b) === 0; };
exports.gt = function (a, b) { return index_1.cmp(a, b) === 1; };
exports.lte = function (a, b) { return index_1.cmp(a, b) !== 1; };
exports.neq = function (a, b) { return index_1.cmp(a, b) !== 0; };
exports.gte = function (a, b) { return index_1.cmp(a, b) !== -1; };
