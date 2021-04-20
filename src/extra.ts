// LICENSE = MIT
import { cmp, Ord } from './index';

type OrdFn<T> = (x: T, index?: number) => Ord;

export const sortBy = <T>(ary: Array<T>, fn: OrdFn<T>) => {
    return ary
        .map((val, idx) => ({val, idx, key: fn(val, idx)}))
        .sort((a, b) => cmp(a.key, b.key) || cmp(a.idx, b.idx))
        .map((obj) => obj.val);
};

export const sortByLazy = <T>(ary: Array<T>, ...fns: Array<OrdFn<T>>) => {
    return ary.sort((a, b) => {
        let c = 0;
        for (let i = 0; i < fns.length; i++) {
            const fn = fns[i];
            c = cmp(fn(a), fn(b));
            if (c !== 0) { break; }
        }
        return c;
    });
};

export const lt = (a: Ord, b: Ord) => cmp(a, b) === -1;
export const eq = (a: Ord, b: Ord) => cmp(a, b) === 0;
export const gt = (a: Ord, b: Ord) => cmp(a, b) === 1;
export const lte = (a: Ord, b: Ord) => cmp(a, b) !== 1;
export const neq = (a: Ord, b: Ord) => cmp(a, b) !== 0;
export const gte = (a: Ord, b: Ord) => cmp(a, b) !== -1;
