import { Arrayable, Nullable } from "./types";

export const toArray = <T>(array?: Nullable<Arrayable<T>>): Array<T> => {
  array = array ?? [];
  return Array.isArray(array) ? array : [array];
};

export const mergeArray = <T>(arr1: Array<T>, arr2: Array<T>): Array<T> => {
  const mergedArray: Array<T> = [...arr1, ...arr2];
  return mergedArray;
};

export const remove = <T>(arr: Array<T>, value: T): boolean => {
  if (!arr) return false;
  const idx: number = arr.indexOf(value);
  if (idx >= 0) {
    arr.splice(idx, 1);
    return true;
  }
  return false;
};

export const removeDuplicate = <T>(arr: Array<T>): Array<T> => {
  return arr.filter((value: T, idx: number) => arr.indexOf(value) === idx);
};
