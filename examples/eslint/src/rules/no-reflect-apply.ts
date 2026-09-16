declare const operation: (...args: unknown[]) => unknown;
declare const owner: unknown;
declare const args: unknown[];
const value = Reflect.apply(operation, owner, args);
