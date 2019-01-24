export type Ord = null | boolean | number | string | OrdArray | OrdReverse;
export interface OrdArray extends Array<Ord> { }
export interface OrdReverse { reverse: Ord; }
// const isReverse = (x: Ord): x is OrdReverse => x && hasOwnProperty.call(x, 'reverse');
export type Ordering = -1 | 0 | 1;
export type CmpFn = (a: Ord, b: Ord) => Ordering;
