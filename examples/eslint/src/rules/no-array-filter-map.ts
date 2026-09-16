declare function active(user: unknown): boolean;
declare function email(user: unknown): string;
[].filter(active).map(email);
