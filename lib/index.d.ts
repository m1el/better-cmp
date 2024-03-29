export declare type Ord = null | boolean | number | string | OrdArray | OrdReverse | LocaleCmp;
export interface OrdArray extends Array<Ord> {
}
export interface OrdReverse {
    reverse: Ord;
}
export interface LocaleCmp {
    localeCompare: string;
    collator?: Intl.Collator;
}
export declare type Ordering = -1 | 0 | 1;
export declare type CmpFn = (a: Ord, b: Ord) => Ordering;
export declare const cmp: (a: Ord, b: Ord) => Ordering;
export default cmp;
