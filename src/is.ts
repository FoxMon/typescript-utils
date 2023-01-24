export const isDefined = <T = any>(target?: T): target is T =>
  typeof target !== "undefined";
export const isBrowser = typeof window !== "undefined";
