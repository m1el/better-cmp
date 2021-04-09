export type Ord = null | boolean | number | string | OrdArray | OrdReverse;
export interface OrdArray extends Array<Ord> { }
export interface OrdReverse {
    reverse: Ord;
}

export type Ordering = -1 | 0 | 1;
export type CmpFn = (a: Ord, b: Ord) => Ordering;

const has: <P extends PropertyKey>(object: {}, property: P) =>
    object is { [K in P]: unknown } =
    Function.prototype.call.bind(Object.prototype.hasOwnProperty);

const toString: (object: unknown) => string =
    Function.prototype.call.bind(Object.prototype.toString);

const isArray: (ary: unknown) => ary is Array<unknown> = Array.isArray ||
    ((ary): ary is Array<unknown> => toString(ary) === '[object Array]');

const isReverse = (x: Ord): x is OrdReverse => x && has(x, 'reverse');

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
export const cmp = (a: Ord, b: Ord): Ordering => {
    // handle reverse sorting
    if (isReverse(a) && isReverse(b)) {
        const tmp = b.reverse;
        b = a.reverse;
        a = tmp;
    }

    const nulla = a === null;
    const nullb = b === null;
    if (nulla || nullb) {
        // a strict version would throw here.
        a = nullb;
        b = nulla;
    } else {
        const typea = typeof a;
        const typeb = typeof b;
        if (typea !== typeb) {
            throw new TypeError(`different types are not orderable: ${typea} <> ${typeb}`);
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
        } else if (typea === 'string' || typea === 'boolean' || typea === 'bigint') {
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

export default cmp
