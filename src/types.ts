// Promise, or maybe not
// PromiseLike<T> => then만 존재
// Promise<T> => finally만 있음
export type Awaitable<T> = T | PromiseLike<T>;

// Null or whatever
export type Nullable<T> = T | null | undefined;

// Function
export type Fn<T = void> = () => T;

// Array or not yet
export type Arrayable<T> = T | Array<T>;

// Infers the element type of an array
export type ElementOf<T> = T extends (infer E)[] ? E : never;

// Curry type
export type Func<T = any> = (...args: T[]) => void;

// Use this if you want to type "any object"
export type AnyObject = Record<string, any>;

// Match function type
export interface MatchType<X, Y> {
  on: (pred: (x: X) => boolean, fn: (x: X) => Y) => MatchType<X, Y>;
  otherwise: (fn: (x: X) => Y) => Y;
}
