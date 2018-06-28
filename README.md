# Better cmp

### Usage

```javascript
var cmp = require('better-cmp');
console.log(cmp([1, '2', null], [1, '1']));
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

- Anything else throws `TypeError`.

There are a few arbitrary decisions made here.
`NaN` could've been placed under zero, but that would produce weird results.
The other consistent solution would be to throw on `NaN`.
`null` is treated as `None` value, and the type of other variable is ignored.

A stricter version of this function would throw on `NaN` and `null`, but these features are useful.

### Tests

Tests are located in `test.js`.

### Author

Igor null <m1el.2027@gmail.com>
