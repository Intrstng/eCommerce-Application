/**
 * Asserts that a value is a string.
 * @param value - The value to check
 * @param name - The name of the value (used in error message)
 * @throws {TypeError} If the value is not a string
 */
import type { Attribute } from '../types';

export function assertString(value: unknown, name: string): asserts value is string {
    if (typeof value !== 'string') {
        throw new TypeError(`${name} must be a string, got ${typeof value}`);
    }
}

export function isValidAttribute(variant: unknown, value: string): variant is Attribute {
    return (
        typeof variant === 'object' &&
        variant !== null &&
        'name' in variant &&
        'value' in variant &&
        variant.name === value
    );
}
