function isObject(target: unknown): boolean {
  return Object.prototype.toString.call(target) === "[object Object]";
}

export function isMergableObject(item: any): boolean {
  return isObject(item) && !Array.isArray(item);
}
