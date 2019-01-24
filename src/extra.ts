// LICENSE = MIT
import { cmp, Ord } from './index';

export const sortBy = <T>(ary: Array<T>, fn: (x: T, index: number) => Ord) => {
    return ary
        .map((val, idx) => ({val, idx, key: fn(val, idx)}))
        .sort((a, b) => cmp(a.key, b.key) || cmp(a.idx, b.idx))
        .map((obj) => obj.val);
};

export const lt = (a: Ord, b: Ord) => cmp(a, b) === -1;
export const eq = (a: Ord, b: Ord) => cmp(a, b) === 0;
export const gt = (a: Ord, b: Ord) => cmp(a, b) === 1;
export const lte = (a: Ord, b: Ord) => cmp(a, b) !== 1;
export const neq = (a: Ord, b: Ord) => cmp(a, b) !== 0;
export const gte = (a: Ord, b: Ord) => cmp(a, b) !== -1;
