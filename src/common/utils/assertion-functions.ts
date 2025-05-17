/**
 * Asserts that a value is a string.
 * @param value - The value to check
 * @param name - The name of the value (used in error message)
 * @throws {TypeError} If the value is not a string
 */

export function assertString(value: unknown, name: string): asserts value is string {
    if (typeof value !== 'string') {
        throw new TypeError(`${name} must be a string, got ${typeof value}`);
    }
}
