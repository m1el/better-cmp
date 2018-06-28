// LICENSE = MIT
var cmp = require('index.js');

var sortBy = function(ary, fn) {
  return ary
    .map(function(val, idx) { return {val: val, idx: idx, key: fn(val, idx)}; })
    .sort(function(a, b) { return cmp(a.key, b.key) || cmp(a.idx, b.idx); })
    .map(function(obj) { return obj.val; });
};

module.exports = {
  sortBy: sortBy,
  lt: function(a, b) { return cmp(a, b) === -1; },
  eq: function(a, b) { return cmp(a, b) === 0; },
  gt: function(a, b) { return cmp(a, b) === 1; },
  lte: function(a, b) { return cmp(a, b) !== 1; },
  neq: function(a, b) { return cmp(a, b) !== 0; },
  gte: function(a, b) { return cmp(a, b) !== -1; }
};
