import type { AnyObject, Fn, Func, MatchType, Nullable } from "./types";

// Call every function in an array
export function callEvery(functions: Array<Nullable<Fn>>): void {
  functions.forEach((fn) => fn && fn());
}

export function matched<X>(x: X) {
  return {
    on: () => matched(x),
    otherwise: () => x,
  };
}

/**
 * 
 * example
 match(0)
  .on(
    (x) => x < 0,
    () => 0
  )
  .on(
    (x) => x >= 0 && x < 1,
    () => 1
  )
  .otherwise((x) => x * 10);
 */
export function match<X, Y>(x: X): MatchType<X, Y> {
  return {
    on: (pred: (x: X) => boolean, fn: (x: X) => Y) =>
      pred(x) ? matched(fn(x)) : match(x),
    otherwise: (fn: (x: X) => Y) => fn(x),
  };
}

export async function asyncEach<T>(
  items: Array<T>,
  cb: (item: T) => Promise<any>
): Promise<void> {
  const totalIndexes: Array<number> = Array.from({ length: items.length })
    .fill(0)
    .map((_, idx: number) => idx);
  for (const idx of totalIndexes) {
    await cb(items[idx]);
  }
}

export async function asyncMap<T>(
  items: Array<T>,
  cb: (item: T) => Promise<T>
) {
  const rtnAsyncArray: Array<T> = [];
  await asyncEach(items, async (item) => {
    const res: T = await cb(item);
    rtnAsyncArray.push(res);
  });
  return rtnAsyncArray;
}

export async function asyncFilter<T>(
  items: Array<T>,
  cb: (item: T) => Promise<boolean>
) {
  const rtnAsyncArray: Array<T> = [];
  await asyncEach(items, async (item) => {
    const condition: boolean = await cb(item);
    condition && rtnAsyncArray.push(item);
  });
  return rtnAsyncArray;
}

export function memoize<T, V>(func: (input: T) => V) {
  const cache = new Map<T, V>();
  return function (input: T): V {
    if (cache.has(input)) return cache.get(input)!;
    const result = func(input);
    cache.set(input, result);
    return result;
  };
}

export function curry(fn: Func, arity = fn.length, ...args: any[]): any {
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
}

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result: any = {};
  keys.forEach((key: K) => (result[key] = obj[key]));
  return result;
}

export function omit(obj: AnyObject, arr: string[]): AnyObject {
  return Object.keys(obj)
    .filter((k: string) => !arr.includes(k))
    .reduce(
      (acc: AnyObject, key: string) => ((acc[key] = obj[key]), acc),
      {} as AnyObject
    );
}

export function size(value: any): number {
  return Array.isArray(value)
    ? value.length
    : value && typeof value === "object"
    ? value.size || value.length || Object.keys(value).length
    : typeof value === "string"
    ? new Blob([value]).size
    : 0;
}

export function pipe(...funcs: Array<Function>): Function {
  return function (v: any) {
    return funcs.reduce((res, func) => {
      return func(res);
    }, v);
  };
}

export function throttle(func: Function, wait: number = 250) {
  let isThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastTime: number;
  return function (this: any) {
    const ctx = this;
    const args = arguments;
    if (!isThrottle) {
      func.apply(ctx, args);
      lastTime = Date.now();
      isThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        const nowTime = Date.now();
        if (nowTime - lastTime >= wait) {
          func.apply(ctx, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
}
