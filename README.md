# Better cmp

### Usage

```javascript
const { cmp } = require('better-cmp');
console.assert(cmp([1, 'b', null], [1, 'a']) === 1);
console.assert(cmp([1, {reverse: 'b'}, null], [1, {reverse: 'a'}]) === -1);
```

### Sorting convenience functions

This library provides convenience functions for sorting arrays by key function.

**Usage:** `sortBy(arrayToSort, keyFunction)`.  `keyFunction` converts array item to sorting criteria.

**Example:**

```javascript
const { sortBy } = require('better-cmp/lib/extra');
const dataset = [
    {group: 1, name: 'Foo', value: 3},
    {group: 2, name: 'Bar', value: 1},
    {group: 1, name: 'Baz', value: 2},
];
const sorted = sortBy(dataset, (item) => [item.group, item.value]);
console.assert(sorted.map((item) => item.name).join(',') === 'Baz,Foo,Bar');
```

### Rationale

- Very often, when sorting arrays in JavaScript, you need a comparison function.

- JavaScript has a loosely typed comparison (`<`, `>`) and equality (`==`).
It is useful to have a stricter version of comparison.

- It's useful to have a lexicographical comparison of two arrays, if multiple sorting criteria are used.

### Specification

- `null` is smaller than anything else.

- Values of different types throw `TypeError`, with sole exception of `null`.

- `NaN` is smaller than any other number.

- Non-`NaN` numbers, strings, booleans and BigInts compare as usual.

- Arrays are compared lexicographically, comparing the elements recursively.

- If both values are objects that have a `reverse` key, they are sorted in reverse order, using the value by that key.


**Example:**

```javascript
console.assert(cmp({reverse: 0}, {reverse: 1}) === 1);
console.assert(cmp({reverse: [1, 1]}, {reverse: [1, 2]}) === 1);
```

- If both values are objects that have a `localeCompare` key, they are compared using [Intl.Collator][1].  
You can specify a custom collator using `collator` key.

**Example:**

```javascript
// default comparison
console.assert(cmp({localeCompare: 'a'}, {localeCompare: 'A'}) === -1);

// case-insensitive, accent-insensitive comparison
const baseCollator = new Intl.Collator('en', { sensitivity: 'base' });
console.assert(cmp(
    {localeCompare: 'réservé', collator: baseCollator},
    {localeCompare: 'RESERVE', collator: baseCollator}
) === 0);

// case-insensitive, accent-sensitive comparison
const accentCollator = new Intl.Collator('en', { sensitivity: 'accent' });
console.assert(cmp(
    {localeCompare: 'réservé', collator: accentCollator},
    {localeCompare: 'RESERVE', collator: accentCollator}
) === 1);
```

- Anything else throws `TypeError`.

There are a few arbitrary decisions made here.
`NaN` could've been placed under zero, but that would produce weird results.
The other consistent solution would be to throw on `NaN`.
`null` is treated as `None` value, and the type of other variable is ignored.

### Tests

Tests are located in `src/index.test.ts`.

### License

MIT

### Author

Igor null <m1el.2027@gmail.com>

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator "Intl.Collator"
