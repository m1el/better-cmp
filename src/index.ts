export type Ord =
    | null | boolean | number | string
    | OrdArray | OrdReverse | LocaleCmp;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OrdArray extends Array<Ord> { }
export interface OrdReverse {
    reverse: Ord;
}

export interface LocaleCmp {
    localeCompare: string;
    collator?: Intl.Collator;
}

export type Ordering = -1 | 0 | 1;
export type CmpFn = (a: Ord, b: Ord) => Ordering;

const has: <P extends PropertyKey>(object: unknown, property: P) =>
    object is { [K in P]: unknown } =
    Function.prototype.call.bind(Object.prototype.hasOwnProperty);

const isReverse = (x: Ord): x is OrdReverse => x && has(x, 'reverse');
const isLocaleCmp = (x: Ord): x is LocaleCmp => x && has(x, 'localeCompare');

// Do not invoke Intl.Collator constructor immediately in case the browser
// doesn't support this.
let defaultCollator: Intl.Collator | undefined;
const getCollator = (): Intl.Collator =>
    defaultCollator = defaultCollator || new Intl.Collator();

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
    const nulla = a === null;
    const nullb = b === null;
    if (nulla || nullb) {
        // The type of other value is ignored, a stricter version
        // of this function would check the type before returning.
        a = nullb;
        b = nulla;
    } else {
        const ta = typeof a;
        const tb = typeof b;
        if (ta !== tb) {
            throw new TypeError(
                `different types are not orderable: ${ta} <> ${tb}`);
        }

        if (ta === 'number') {
            const nana = a !== a;
            const nanb = b !== b;
            if (nana || nanb) {
                a = nanb;
                b = nana;
            }
        } else if (ta === 'string' || ta === 'boolean' || ta === 'bigint') {
            // passthrough
        } else if (isReverse(a) && isReverse(b)) {
            // handle reverse sorting
            return cmp(b.reverse, a.reverse);
        } else if (Array.isArray(a) && Array.isArray(b)) {
            const len = Math.min(a.length, b.length);
            for (let i = 0; i < len; i++) {
                const c = cmp(a[i], b[i]);
                if (c !== 0) { return c; }
            }
            a = a.length;
            b = b.length;
        } else if (isLocaleCmp(a) && isLocaleCmp(b)) {
            // handle localeCompare
            const collator = a.collator || getCollator();
            // cmp(x, 0) is necessary because "some browsers may return -2 or 2,
            // or even some other negative or positive value."
            return cmp(collator.compare(a.localeCompare, b.localeCompare), 0);
        } else {
            throw new TypeError('only scalars, arrays, ' +
                'reverse and localeCompare are orderable');
        }
    }

    return (a > b) ? 1 : ((a < b) ? -1 : 0);
};

export default cmp;
