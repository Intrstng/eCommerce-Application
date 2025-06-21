import { describe, it, expect } from 'vitest';
import { assertString, isValidAttribute, isChangePasswordData } from '../assertion-functions';

describe('Tests for assertString function', () => {
    it('should not throw for valid string', () => {
        expect(() => assertString('test', 'testValue')).not.toThrow();
    });

    it('should throw TypeError for non-string value', () => {
        expect(() => assertString(123, 'testValue')).toThrow(TypeError);
        expect(() => assertString(null, 'testValue')).toThrow(TypeError);
        expect(() => assertString({}, 'testValue')).toThrow(TypeError);
    });
});

describe('Tests for isValidAttribute function', () => {
    it('should return true for valid attribute', () => {
        const attribute = { name: 'test', value: 'value' };
        expect(isValidAttribute(attribute, 'test')).toBe(true);
    });

    it('should return false for invalid attribute', () => {
        const invalidAttribute = { name: 'wrong', value: 'value' };
        expect(isValidAttribute(invalidAttribute, 'test')).toBe(false);

        const notAnObject = 'not-an-object';
        expect(isValidAttribute(notAnObject, 'test')).toBe(false);
    });
});

describe('Tests for isChangePasswordData function', () => {
    it('should return true for valid change password data', () => {
        const validData = {
            currentPassword: 'currentPass',
            newPassword: 'newPass',
            confirmPassword: 'newPass',
        };
        expect(isChangePasswordData(validData)).toBe(true);
    });

    it('should return false for invalid change password data', () => {
        const invalidData = {
            currentPassword: 'currentPass',
            newPassword: 'newPass',
        };
        expect(isChangePasswordData(invalidData)).toBe(false);

        const notAnObject = 'not-an-object';
        expect(isChangePasswordData(notAnObject)).toBe(false);
    });
});
