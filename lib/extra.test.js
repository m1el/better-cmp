"use strict";
exports.__esModule = true;
var globals_1 = require("@jest/globals");
var extra_1 = require("./extra");
globals_1.test('sortBy works', function () {
    globals_1.expect(extra_1.sortBy([4, 3, 1, 2], function (x) { return x; })).toStrictEqual([1, 2, 3, 4]);
    globals_1.expect(extra_1.sortBy([4, 3, 1, 2], function (x) { return ({ reverse: x }); })).toStrictEqual([4, 3, 2, 1]);
});
globals_1.test('sortBy works with multiple criteria', function () {
    var dataset = [
        { group: 1, name: 'Juan' },
        { group: 2, name: 'Joanne' },
        { group: 2, name: 'Jeanne' },
        { group: 1, name: 'Joan' },
    ];
    var sorted = [
        { group: 1, name: 'Joan' },
        { group: 1, name: 'Juan' },
        { group: 2, name: 'Jeanne' },
        { group: 2, name: 'Joanne' },
    ];
    globals_1.expect(extra_1.sortBy(dataset, function (_a) {
        var group = _a.group, name = _a.name;
        return [group, name];
    })).toStrictEqual(sorted);
    var reverse = sorted.slice().reverse();
    globals_1.expect(extra_1.sortBy(dataset, function (_a) {
        var group = _a.group, name = _a.name;
        return ({ reverse: [group, name] });
    })).toStrictEqual(reverse);
});
globals_1.test('sortByLazy works', function () {
    globals_1.expect(extra_1.sortByLazy([4, 3, 1, 2], function (x) { return x; })).toStrictEqual([1, 2, 3, 4]);
    globals_1.expect(extra_1.sortByLazy([4, 3, 1, 2], function (x) { return ({ reverse: x }); })).toStrictEqual([4, 3, 2, 1]);
});
globals_1.test('sortByLazy works with multiple criteria', function () {
    var dataset = [
        { group: 1, name: 'Juan' },
        { group: 2, name: 'Joanne' },
        { group: 2, name: 'Jeanne' },
        { group: 1, name: 'Joan' },
    ];
    var sorted = [
        { group: 1, name: 'Joan' },
        { group: 1, name: 'Juan' },
        { group: 2, name: 'Jeanne' },
        { group: 2, name: 'Joanne' },
    ];
    globals_1.expect(extra_1.sortByLazy(dataset, function (o) { return o.group; }, function (o) { return o.name; })).toStrictEqual(sorted);
    var reverse = sorted.slice().reverse();
    globals_1.expect(extra_1.sortByLazy(dataset, function (o) { return ({ reverse: o.group }); }, function (o) { return ({ reverse: o.name }); })).toStrictEqual(reverse);
});
globals_1.test('lt, eq, gt, gte, neq, lte work as expected', function () {
    var matrix = [
        // fn  a<b   a=b    a>b
        [extra_1.eq, false, true, false],
        [extra_1.neq, true, false, true],
        [extra_1.gt, false, false, true],
        [extra_1.lte, true, true, false],
        [extra_1.lt, true, false, false],
        [extra_1.gte, false, true, true],
    ];
    for (var _i = 0, matrix_1 = matrix; _i < matrix_1.length; _i++) {
        var _a = matrix_1[_i], fn = _a[0], ltVal = _a[1], eqVal = _a[2], gtVal = _a[3];
        globals_1.expect(fn(0, 1)).toBe(ltVal);
        globals_1.expect(fn(0, 0)).toBe(eqVal);
        globals_1.expect(fn(1, 0)).toBe(gtVal);
    }
});
globals_1.test('example from documentation works', function () {
    var dataset = [
        { group: 1, name: 'Foo', value: 3 },
        { group: 2, name: 'Bar', value: 1 },
        { group: 1, name: 'Baz', value: 2 },
    ];
    var sorted = extra_1.sortBy(dataset, function (item) { return [item.group, item.value]; });
    globals_1.expect(sorted.map(function (item) { return item.name; }).join(',')).toBe('Baz,Foo,Bar');
});
