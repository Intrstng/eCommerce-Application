export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

export function hasNumberProperty<T extends string>(
    object: Record<string, unknown>,
    property: T
): object is Record<T, number> {
    return property in object && typeof object[property] === 'number';
}
