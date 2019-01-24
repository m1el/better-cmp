# Better cmp

### Usage

```javascript
const { cmp } = require('better-cmp');
console.assert(cmp([1, 'b', null], [1, 'a']) === -1);
console.assert(cmp([1, {reverse: 'b'}, null], [1, {reverse: 'a'}]) === 1);
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

- If both values are objects that have a `reverse` key, are sorted in reverse order, using the value by that key.

- Anything else throws `TypeError`.

There are a few arbitrary decisions made here.
`NaN` could've been placed under zero, but that would produce weird results.
The other consistent solution would be to throw on `NaN`.
`null` is treated as `None` value, and the type of other variable is ignored.

### Breaking changes

From version 1.1.0 to 2.0.0, export method was changed to make it more user-friendly for TypeScript.

Until 1.1.0: `var cmp = require('better-cmp');`

Since 2.0.0: `var cmp = require('better-cmp').cmp;` ...or `const { cmp } = require('better-cmp');`

### Tests

Tests are located in `lib/test.ts`.

### License

MIT

### Author

Igor null <m1el.2027@gmail.com>
