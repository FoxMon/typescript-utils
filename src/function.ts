import type { Fn, MatchType, Nullable } from "./types";

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
