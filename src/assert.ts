export class AssertionError {
  constructor(msg: string) {
    throw new Error(msg);
  }
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new AssertionError("Not a string!");
  }
}

export function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new AssertionError("Not a number!");
  }
}
