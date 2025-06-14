/**
 * Asserts that a value is a string.
 * @param value - The value to check
 * @param name - The name of the value (used in error message)
 * @throws {TypeError} If the value is not a string
 */
import type { Attribute } from '../types';
import type { ChangePasswordData } from '../validations/changePasswordValidation.schema';
import { PromoCodes } from '../enums';

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

export function isChangePasswordData(data: unknown): data is ChangePasswordData {
    return (
        typeof data === 'object' &&
        data !== null &&
        'currentPassword' in data &&
        'newPassword' in data &&
        'confirmPassword' in data
    );
}

export const isValidPromoCode = (code: string): code is PromoCodes => {
    return Object.values<string>(PromoCodes).includes(code);
};
