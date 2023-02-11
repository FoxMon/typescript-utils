export function isObject(target: unknown): boolean {
  return Object.prototype.toString.call(target) === "[object Object]";
}

export function isMergableObject(item: any): boolean {
  return isObject(item) && !Array.isArray(item);
}

export function mergeObject(o1: any, o2: any): any {
  const newObj = Object.assign({}, o2);
  for (const key in o1) {
    newObj[key] = o1[key];
  }
  return newObj;
}
