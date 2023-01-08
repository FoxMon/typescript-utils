export function isArray(target: unknown): boolean {
  return Array.isArray(target);
}

export function isBoolean(target: unknown): boolean {
  return target === true || target === false;
}

export function isNull(target: unknown): boolean {
  return target === null;
}

export function isUndefined(target: unknown): boolean {
  return target === "undefined";
}

export function isNumber(target: unknown): boolean {
  return typeof target === "number";
}

export function isString(target: unknown): boolean {
  return typeof target === "string";
}

export function isObject(target: unknown): boolean {
  return Object.prototype.toString.call(target) === "[object Object]";
}