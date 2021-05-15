"use strict";
exports.__esModule = true;
var globals_1 = require("@jest/globals");
var index_1 = require("./index");
globals_1.test('null is smaller than everything else', function () {
    globals_1.expect(index_1.cmp(null, null)).toBe(0);
    globals_1.expect(index_1.cmp(null, 0)).toBe(-1);
    globals_1.expect(index_1.cmp(null, 1)).toBe(-1);
    globals_1.expect(index_1.cmp(null, -Infinity)).toBe(-1);
    globals_1.expect(index_1.cmp(null, Infinity)).toBe(-1);
    globals_1.expect(index_1.cmp(null, NaN)).toBe(-1);
    globals_1.expect(index_1.cmp(null, true)).toBe(-1);
    globals_1.expect(index_1.cmp(null, '')).toBe(-1);
    globals_1.expect(index_1.cmp(null, 'null')).toBe(-1);
    globals_1.expect(index_1.cmp(null, [null])).toBe(-1);
    globals_1.expect(index_1.cmp(null, [1])).toBe(-1);
    globals_1.expect(index_1.cmp(null, ['abc'])).toBe(-1);
});
globals_1.test('different types throw', function () {
    globals_1.expect(function () { return index_1.cmp(true, 'true'); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(true, ''); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(true, 1); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(false, 'false'); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(false, ''); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(false, 0); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(0, '0'); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(0, ''); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(1, '1'); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(NaN, 'NaN'); }).toThrowError(TypeError);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globals_1.expect(function () { return index_1.cmp(0, {}); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(false, [false]); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(false, []); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(true, [true]); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(0, []); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp('', []); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp(undefined, 0); }).toThrowError(TypeError);
    // expect(() => cmp(null, {})).toThrowError(TypeError);
    // expect(() => cmp(null, undefined)).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp([1], ['1']); }).toThrowError(TypeError);
    globals_1.expect(function () { return index_1.cmp({ reverse: 1 }, { localeCompare: '1' }); }).toThrowError(TypeError);
});
globals_1.test('NaNs are smaller than other numbers', function () {
    globals_1.expect(index_1.cmp(NaN, NaN)).toBe(0);
    globals_1.expect(index_1.cmp(NaN, 0)).toBe(-1);
    globals_1.expect(index_1.cmp(NaN, 1)).toBe(-1);
    globals_1.expect(index_1.cmp(NaN, -1)).toBe(-1);
    globals_1.expect(index_1.cmp(NaN, Infinity)).toBe(-1);
    globals_1.expect(index_1.cmp(NaN, -Infinity)).toBe(-1);
});
globals_1.test('numbers are ordered correctly', function () {
    globals_1.expect(index_1.cmp(0, 0)).toBe(0);
    globals_1.expect(index_1.cmp(0, -0)).toBe(0);
    globals_1.expect(index_1.cmp(1, 1)).toBe(0);
    globals_1.expect(index_1.cmp(-1, -1)).toBe(0);
    globals_1.expect(index_1.cmp(Infinity, Infinity)).toBe(0);
    globals_1.expect(index_1.cmp(-Infinity, -Infinity)).toBe(0);
    globals_1.expect(index_1.cmp(0, 1)).toBe(-1);
    globals_1.expect(index_1.cmp(-1, 0)).toBe(-1);
    globals_1.expect(index_1.cmp(-1, 0)).toBe(-1);
    globals_1.expect(index_1.cmp(1, 2)).toBe(-1);
    globals_1.expect(index_1.cmp(-2, 1)).toBe(-1);
    globals_1.expect(index_1.cmp(-Infinity, Infinity)).toBe(-1);
    globals_1.expect(index_1.cmp(-Infinity, 0)).toBe(-1);
    globals_1.expect(index_1.cmp(-Infinity, 1)).toBe(-1);
    globals_1.expect(index_1.cmp(-Infinity, -1)).toBe(-1);
    globals_1.expect(index_1.cmp(0, Infinity)).toBe(-1);
    globals_1.expect(index_1.cmp(1, Infinity)).toBe(-1);
    globals_1.expect(index_1.cmp(-1, Infinity)).toBe(-1);
});
globals_1.test('strings are ordered lexicographically', function () {
    globals_1.expect(index_1.cmp('', '')).toBe(0);
    globals_1.expect(index_1.cmp('a', 'a')).toBe(0);
    globals_1.expect(index_1.cmp('', 'a')).toBe(-1);
    globals_1.expect(index_1.cmp('a', 'aa')).toBe(-1);
    globals_1.expect(index_1.cmp('a', 'b')).toBe(-1);
    globals_1.expect(index_1.cmp('aa', 'ab')).toBe(-1);
    globals_1.expect(index_1.cmp('aaa', 'aba')).toBe(-1);
});
globals_1.test('arrays are ordered lexicographically', function () {
    globals_1.expect(index_1.cmp([], [])).toBe(0);
    globals_1.expect(index_1.cmp([], [1])).toBe(-1);
    globals_1.expect(index_1.cmp([1], [1])).toBe(0);
    globals_1.expect(index_1.cmp([1], [2])).toBe(-1);
    globals_1.expect(index_1.cmp([1], [1, 2])).toBe(-1);
    globals_1.expect(index_1.cmp([1, 2], [1, 2])).toBe(0);
    globals_1.expect(index_1.cmp([1, '1', 3], [1, '1,2'])).toBe(-1);
    globals_1.expect(index_1.cmp([1, 1, 1], [1, 2, 1])).toBe(-1);
});
globals_1.test('nested arrays are processed correctly', function () {
    globals_1.expect(index_1.cmp([1, [1, 1]], [1, [1, 2]])).toBe(-1);
});
globals_1.test('reverse sorting works as expected', function () {
    globals_1.expect(index_1.cmp({ reverse: 'a' }, { reverse: 'a' })).toBe(0);
    globals_1.expect(index_1.cmp({ reverse: 'a' }, { reverse: 'b' })).toBe(1);
    globals_1.expect(index_1.cmp({ reverse: 0 }, { reverse: 0 })).toBe(0);
    globals_1.expect(index_1.cmp({ reverse: 0 }, { reverse: 1 })).toBe(1);
    globals_1.expect(index_1.cmp({ reverse: [1] }, { reverse: [1] })).toBe(0);
    globals_1.expect(index_1.cmp({ reverse: [1, 1] }, { reverse: [1, 2] })).toBe(1);
    globals_1.expect(index_1.cmp({ reverse: null }, { reverse: 1 })).toBe(1);
});
globals_1.test('nested reverse is handled properly', function () {
    globals_1.expect(index_1.cmp({ reverse: { reverse: 'a' } }, { reverse: { reverse: 'b' } })).toBe(-1);
});
globals_1.test('localeCompare works with default collator', function () {
    globals_1.expect(index_1.cmp({ localeCompare: 'a' }, { localeCompare: 'A' })).toBe(-1);
    globals_1.expect(index_1.cmp({ localeCompare: 'a' }, { localeCompare: 'a' })).toBe(0);
});
globals_1.test('localeCompare works with base collator', function () {
    var baseCollator = new Intl.Collator('en', { sensitivity: 'base' });
    globals_1.expect(index_1.cmp({ localeCompare: 'aaa', collator: baseCollator }, { localeCompare: 'aab', collator: baseCollator })).toBe(-1);
    globals_1.expect(index_1.cmp({ localeCompare: 'a', collator: baseCollator }, { localeCompare: 'A', collator: baseCollator })).toBe(0);
    globals_1.expect(index_1.cmp({ localeCompare: 'réservé', collator: baseCollator }, { localeCompare: 'RESERVE', collator: baseCollator })).toBe(0);
});
globals_1.test('localeCompare works with accent collator', function () {
    var accentCollator = new Intl.Collator('en', { sensitivity: 'accent' });
    globals_1.expect(index_1.cmp({ localeCompare: 'a', collator: accentCollator }, { localeCompare: 'A', collator: accentCollator })).toBe(0);
    globals_1.expect(index_1.cmp({ localeCompare: 'réservé', collator: accentCollator }, { localeCompare: 'RESERVE', collator: accentCollator })).toBe(1);
});
globals_1.test('localeCompare and reverse sorting compose', function () {
    var accentCollator = new Intl.Collator('en', { sensitivity: 'accent' });
    globals_1.expect(index_1.cmp({ reverse: { localeCompare: 'réservé', collator: accentCollator } }, { reverse: { localeCompare: 'RESERVE', collator: accentCollator } })).toBe(-1);
});
globals_1.test('example from documentation works', function () {
    globals_1.expect(index_1.cmp([1, 'b', null], [1, 'a'])).toBe(1);
    globals_1.expect(index_1.cmp([1, { reverse: 'b' }, null], [1, { reverse: 'a' }])).toBe(-1);
});
