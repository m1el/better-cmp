import { Ord } from './types';
export declare const sortBy: <T>(ary: T[], fn: (x: T, index: number) => Ord) => T[];
export declare const lt: (a: Ord, b: Ord) => boolean;
export declare const eq: (a: Ord, b: Ord) => boolean;
export declare const gt: (a: Ord, b: Ord) => boolean;
export declare const lte: (a: Ord, b: Ord) => boolean;
export declare const neq: (a: Ord, b: Ord) => boolean;
export declare const gte: (a: Ord, b: Ord) => boolean;
