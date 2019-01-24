import {Ord, OrdArray, Ordering, OrdReverse} from './types';

const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;
const isArray: (ary: any) => ary is Array<any> = Array.isArray ||
    ((ary): ary is Array<any> => toString.call(ary) === '[object Array]');

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
const cmp = (a: Ord, b: Ord): Ordering => {
    const nulla = a === null;
    const nullb = b === null;
    if (nulla || nullb) {
        // a strict version would throw here.
        a = nullb;
        b = nulla;
    } else {
        // handle reverse sorting
        if (a && b && hasOwnProperty.call(a, 'reverse') && hasOwnProperty.call(b, 'reverse')) {
            const tmp = (b as OrdReverse).reverse;
            b = (a as OrdReverse).reverse;
            a = tmp;
        }

        const typea = typeof a;
        const typeb = typeof b;
        if (typea !== typeb) {
            throw new TypeError('different types are not orderable: ' + typea + ' <> ' + typeb);
        }

        if (typea === 'number') {
            const nana = isNaN(a as number);
            const nanb = isNaN(b as number);
            if (nana || nanb) {
                a = nanb;
                b = nana;
            }
            // else {
            // passthrough
            // }
        } else if (typea === 'string' || typea === 'boolean' /* || typea === 'bigint' */) {
            // tslint:disable-next-line:no-empty
            // passthrough
        } else if (isArray(a) && isArray(b)) {
            const len = Math.min(a.length, b.length);
            for (let i = 0; i < len; i++) {
                const c = cmp(a[i], b[i]);
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

export = cmp;
