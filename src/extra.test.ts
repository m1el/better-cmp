import { test, expect } from '@jest/globals';
import { Ord } from './index';
import { lt, eq, gt, gte, neq, lte, sortBy, sortByLazy } from './extra';

test('sortBy works', () => {
    expect(
        sortBy([4, 3, 1, 2], (x) => x)
    ).toStrictEqual([1, 2, 3, 4]);

    expect(
        sortBy([4, 3, 1, 2], (x) => ({reverse: x}))
    ).toStrictEqual([4, 3, 2, 1]);
});

test('sortBy works with multiple criteria', () => {
    const dataset = [
        {group: 1, name: 'Juan'},
        {group: 2, name: 'Joanne'},
        {group: 2, name: 'Jeanne'},
        {group: 1, name: 'Joan'},
    ];
    const sorted = [
        {group: 1, name: 'Joan'},
        {group: 1, name: 'Juan'},
        {group: 2, name: 'Jeanne'},
        {group: 2, name: 'Joanne'},
    ];

    expect(
        sortBy(dataset, ({ group, name }) => [group, name])
    ).toStrictEqual(sorted);

    const reverse = sorted.slice().reverse();
    expect(
        sortBy(dataset, ({ group, name }) => ({reverse: [group, name]}))
    ).toStrictEqual(reverse);
});

test('sortByLazy works', () => {
    expect(
        sortByLazy([4, 3, 1, 2], (x) => x)
    ).toStrictEqual([1, 2, 3, 4]);

    expect(
        sortByLazy([4, 3, 1, 2], (x) => ({reverse: x}))
    ).toStrictEqual([4, 3, 2, 1]);
});

test('sortByLazy works with multiple criteria', () => {
    const dataset = [
        {group: 1, name: 'Juan'},
        {group: 2, name: 'Joanne'},
        {group: 2, name: 'Jeanne'},
        {group: 1, name: 'Joan'},
    ];
    const sorted = [
        {group: 1, name: 'Joan'},
        {group: 1, name: 'Juan'},
        {group: 2, name: 'Jeanne'},
        {group: 2, name: 'Joanne'},
    ];

    expect(
        sortByLazy(dataset, (o) => o.group, (o) => o.name)
    ).toStrictEqual(sorted);

    const reverse = sorted.slice().reverse();
    expect(
        sortByLazy(
            dataset,
            (o) => ({reverse: o.group}),
            (o) => ({reverse: o.name})
        )
    ).toStrictEqual(reverse);
});

test('lt, eq, gt, gte, neq, lte work as expected', () => {
    type CmpPredicate = (a: Ord, b: Ord) => boolean;
    const matrix: Array<[CmpPredicate, boolean, boolean, boolean]> = [
        // fn  a<b   a=b    a>b
        [eq,  false, true,  false],
        [neq, true,  false, true ],
        [gt,  false, false, true ],
        [lte, true,  true,  false],
        [lt,  true,  false, false],
        [gte, false, true,  true ],
    ];

    for (const [fn, ltVal, eqVal, gtVal] of matrix) {
        expect(fn(0, 1)).toBe(ltVal);
        expect(fn(0, 0)).toBe(eqVal);
        expect(fn(1, 0)).toBe(gtVal);
    }
});

test('example from documentation works', () => {
    const dataset = [
        {name: 'Foo', value: 3},
        {name: 'Bar', value: 1},
        {name: 'Baz', value: 2},
    ];
    const sorted = sortBy(dataset, (item) => item.value);
    expect(sorted.map((x) => x.name).join(',')).toBe('Bar,Baz,Foo');
});
