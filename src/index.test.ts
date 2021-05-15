import { test, expect } from '@jest/globals';
import { cmp }  from './index';

test('null is smaller than everything else', () => {
    expect(cmp(null, null)).toBe(0);
    expect(cmp(null, 0)).toBe(-1);
    expect(cmp(null, 1)).toBe(-1);
    expect(cmp(null, -Infinity)).toBe(-1);
    expect(cmp(null, Infinity)).toBe(-1);
    expect(cmp(null, NaN)).toBe(-1);
    expect(cmp(null, true)).toBe(-1);
    expect(cmp(null, '')).toBe(-1);
    expect(cmp(null, 'null')).toBe(-1);
    expect(cmp(null, [null])).toBe(-1);
    expect(cmp(null, [1])).toBe(-1);
    expect(cmp(null, ['abc'])).toBe(-1);
});

test('different types throw', () => {
    expect(() => cmp(true, 'true')).toThrowError(TypeError);
    expect(() => cmp(true, '')).toThrowError(TypeError);
    expect(() => cmp(true, 1)).toThrowError(TypeError);
    expect(() => cmp(false, 'false')).toThrowError(TypeError);
    expect(() => cmp(false, '')).toThrowError(TypeError);
    expect(() => cmp(false, 0)).toThrowError(TypeError);
    expect(() => cmp(0, '0')).toThrowError(TypeError);
    expect(() => cmp(0, '')).toThrowError(TypeError);
    expect(() => cmp(1, '1')).toThrowError(TypeError);
    expect(() => cmp(NaN, 'NaN')).toThrowError(TypeError);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => cmp(0, {} as any)).toThrowError(TypeError);
    expect(() => cmp(false, [false])).toThrowError(TypeError);
    expect(() => cmp(false, [])).toThrowError(TypeError);
    expect(() => cmp(true, [true])).toThrowError(TypeError);
    expect(() => cmp(0, [])).toThrowError(TypeError);
    expect(() => cmp('', [])).toThrowError(TypeError);
    expect(() => cmp(undefined, 0)).toThrowError(TypeError);
    // expect(() => cmp(null, {})).toThrowError(TypeError);
    // expect(() => cmp(null, undefined)).toThrowError(TypeError);
    expect(() => cmp([1], ['1'])).toThrowError(TypeError);
    expect(() => cmp({reverse: 1}, {localeCompare: '1'})).toThrowError(TypeError);
});

test('NaNs are smaller than other numbers', () => {
    expect(cmp(NaN, NaN)).toBe(0);
    expect(cmp(NaN, 0)).toBe(-1);
    expect(cmp(NaN, 1)).toBe(-1);
    expect(cmp(NaN, -1)).toBe(-1);
    expect(cmp(NaN, Infinity)).toBe(-1);
    expect(cmp(NaN, -Infinity)).toBe(-1);
});

test('numbers are ordered correctly', () => {
    expect(cmp(0, 0)).toBe(0);
    expect(cmp(0, -0)).toBe(0);
    expect(cmp(1, 1)).toBe(0);
    expect(cmp(-1, -1)).toBe(0);
    expect(cmp(Infinity, Infinity)).toBe(0);
    expect(cmp(-Infinity, -Infinity)).toBe(0);
    expect(cmp(0, 1)).toBe(-1);
    expect(cmp(-1, 0)).toBe(-1);
    expect(cmp(-1, 0)).toBe(-1);
    expect(cmp(1, 2)).toBe(-1);
    expect(cmp(-2, 1)).toBe(-1);
    expect(cmp(-Infinity, Infinity)).toBe(-1);
    expect(cmp(-Infinity, 0)).toBe(-1);
    expect(cmp(-Infinity, 1)).toBe(-1);
    expect(cmp(-Infinity, -1)).toBe(-1);
    expect(cmp(0, Infinity)).toBe(-1);
    expect(cmp(1, Infinity)).toBe(-1);
    expect(cmp(-1, Infinity)).toBe(-1);
});

test('strings are ordered lexicographically', () => {
    expect(cmp('', '')).toBe(0);
    expect(cmp('a', 'a')).toBe(0);
    expect(cmp('', 'a')).toBe(-1);
    expect(cmp('a', 'aa')).toBe(-1);
    expect(cmp('a', 'b')).toBe(-1);
    expect(cmp('aa', 'ab')).toBe(-1);
    expect(cmp('aaa', 'aba')).toBe(-1);
});

test('arrays are ordered lexicographically', () => {
    expect(cmp([], [])).toBe(0);
    expect(cmp([], [1])).toBe(-1);
    expect(cmp([1], [1])).toBe(0);
    expect(cmp([1], [2])).toBe(-1);
    expect(cmp([1], [1, 2])).toBe(-1);
    expect(cmp([1, 2], [1, 2])).toBe(0);
    expect(cmp([1, '1', 3], [1, '1,2'])).toBe(-1);
    expect(cmp([1, 1, 1], [1, 2, 1])).toBe(-1);
});

test('nested arrays are processed correctly', () => {
    expect(cmp([1, [1, 1]], [1, [1, 2]])).toBe(-1);
});

test('reverse sorting works as expected', () => {
    expect(cmp({reverse: 'a'}, {reverse: 'a'})).toBe(0);
    expect(cmp({reverse: 'a'}, {reverse: 'b'})).toBe(1);
    expect(cmp({reverse: 0}, {reverse: 0})).toBe(0);
    expect(cmp({reverse: 0}, {reverse: 1})).toBe(1);
    expect(cmp({reverse: [1]}, {reverse: [1]})).toBe(0);
    expect(cmp({reverse: [1, 1]}, {reverse: [1, 2]})).toBe(1);
    expect(cmp({reverse: null}, {reverse: 1})).toBe(1);
});

test('nested reverse is handled properly', () => {
    expect(
        cmp({reverse: {reverse: 'a'}}, {reverse: {reverse: 'b'}})
    ).toBe(-1);
});

test('localeCompare works with default collator', () => {
    expect(cmp({localeCompare: 'a'}, {localeCompare: 'A'})).toBe(-1);
    expect(cmp({localeCompare: 'a'}, {localeCompare: 'a'})).toBe(0);
});

test('localeCompare works with base collator', () => {
    const baseCollator = new Intl.Collator('en', { sensitivity: 'base' });
    expect(cmp(
        {localeCompare: 'aaa', collator: baseCollator},
        {localeCompare: 'aab', collator: baseCollator}
    )).toBe(-1);

    expect(cmp(
        {localeCompare: 'a', collator: baseCollator},
        {localeCompare: 'A', collator: baseCollator}
    )).toBe(0);

    expect(cmp(
        {localeCompare: 'réservé', collator: baseCollator},
        {localeCompare: 'RESERVE', collator: baseCollator}
    )).toBe(0);
});

test('localeCompare works with accent collator', () => {
    const accentCollator = new Intl.Collator('en', { sensitivity: 'accent' });
    expect(cmp(
        {localeCompare: 'a', collator: accentCollator},
        {localeCompare: 'A', collator: accentCollator}
    )).toBe(0);

    expect(cmp(
        {localeCompare: 'réservé', collator: accentCollator},
        {localeCompare: 'RESERVE', collator: accentCollator}
    )).toBe(1);
});

test('localeCompare and reverse sorting compose', () => {
    const accentCollator = new Intl.Collator('en', { sensitivity: 'accent' });
    expect(cmp(
        {reverse: {localeCompare: 'réservé', collator: accentCollator}},
        {reverse: {localeCompare: 'RESERVE', collator: accentCollator}}
    )).toBe(-1);
});

test('example from documentation works', () => {
    expect(cmp([1, 'b', null], [1, 'a'])).toBe(1);
    expect(cmp([1, {reverse: 'b'}, null], [1, {reverse: 'a'}])).toBe(-1);
});
