declare const value: string | undefined;
const result = { ...(value !== undefined ? { value } : {}) };
