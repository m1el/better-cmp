"use strict";
exports.__esModule = true;
exports.cmp = void 0;
var has = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
var toString = Function.prototype.call.bind(Object.prototype.toString);
var isArray = Array.isArray ||
    (function (ary) { return toString(ary) === '[object Array]'; });
var isReverse = function (x) { return x && has(x, 'reverse'); };
var isLocaleCmp = function (x) { return x && has(x, 'localeCompare'); };
// Do not invoke Intl.Collator constructor immediately in case the browser
// doesn't support this.
var defaultCollator;
var getCollator = function () {
    return defaultCollator = defaultCollator !== null && defaultCollator !== void 0 ? defaultCollator : new Intl.Collator();
};
/*
 * Compare two values.
 *   -1 if a < b
 *    1 if a > b
 *    0 if a == b
 *
 * @param {Ord} a
 * @param {Ord} b
 * @return {-1 | 0 | 1} The result of comparing two values
 * @example
 *   cmp(0, 1) === -1
 *   cmp(false, true) === -1
 *   cmp('a', 'b') === -1
 *   cmp([0, 0], [0, 1]) === -1
 *   cmp({reverse: 0}, {reverse: 1}) === 1
 *   cmp(null, 0) === -1
 */
exports.cmp = function (a, b) {
    var _a;
    // handle reverse sorting
    if (isReverse(a) && isReverse(b)) {
        var tmp = b.reverse;
        b = a.reverse;
        a = tmp;
    }
    // handle localeCompare
    if (isLocaleCmp(a) && isLocaleCmp(b)) {
        var collator = (_a = a.collator) !== null && _a !== void 0 ? _a : getCollator();
        // cmp(x, 0) is necessary because "some browsers may return -2 or 2,
        // or even some other negative or positive value."
        return exports.cmp(collator.compare(a.localeCompare, b.localeCompare), 0);
    }
    var nulla = a === null;
    var nullb = b === null;
    if (nulla || nullb) {
        // a strict version would throw here.
        a = nullb;
        b = nulla;
    }
    else {
        var typea = typeof a;
        var typeb = typeof b;
        if (typea !== typeb) {
            throw new TypeError("different types are not orderable: " + typea + " <> " + typeb);
        }
        if (typea === 'number') {
            var nana = isNaN(a);
            var nanb = isNaN(b);
            if (nana || nanb) {
                a = nanb;
                b = nana;
            }
            // else {
            // passthrough
            // }
        }
        else if (typea === 'string' || typea === 'boolean' || typea === 'bigint') {
            // passthrough
        }
        else if (isArray(a) && isArray(b)) {
            var len = Math.min(a.length, b.length);
            for (var i = 0; i < len; i++) {
                var c = exports.cmp(a[i], b[i]);
                if (c !== 0) {
                    return c;
                }
            }
            a = a.length;
            b = b.length;
        }
        else {
            throw new TypeError('only scalars and arrays are orderable');
        }
    }
    return (a > b) ? 1 : ((a < b) ? -1 : 0);
};
exports["default"] = exports.cmp;
