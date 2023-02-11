import { Arrayable, Nullable } from "./types";

export const toArray = <T>(array?: Nullable<Arrayable<T>>): Array<T> => {
  array = array ?? [];
  return Array.isArray(array) ? array : [array];
};

export const mergeArray = <T>(arr1: Array<T>, arr2: Array<T>): Array<T> => {
  const mergedArray: Array<T> = [...arr1, ...arr2];
  return mergedArray;
};
