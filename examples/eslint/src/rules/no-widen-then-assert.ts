const source = { id: "second" };
const widened: unknown = source;
const parsed = widened as { readonly id: string };
