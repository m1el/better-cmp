/*global module*/
// LICENSE = MIT
var toString = Object.prototype.toString;
var isArray = Array.isArray || function(ary) {
  return toString.call(ary) === '[object Array]';
};

var cmp = function(a, b) {
  var nulla = a === null;
  var nullb = b === null;
  if (nulla || nullb) {
    // a strict version would throw here.
    a = nullb;
    b = nulla;
  } else {
    var typea = typeof a;
    var typeb = typeof b;
    if (typea !== typeb) {
      throw new TypeError('different types are not orderable: ' + typea + ' <> ' + typeb);
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
    } else if (typea === 'string' || typea === 'boolean' || typea === 'bigint') {
      // passthrough
    } else if (isArray(a) && isArray(b)) {
      var len = Math.min(a.length, b.length);
      for (var i = 0; i < len; i++) {
         var c = cmp(a[i], b[i]);
         if (c !== 0) { return c; }
      }
      a = a.length;
      b = b.length;
    } else {
      throw new TypeError('only scalars and arrays are orderable');
    }
  }

  return (a > b) ? 1 : ((a < b) ? -1 : 0);
};

module.exports = cmp;
