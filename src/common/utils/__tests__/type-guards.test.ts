import { describe, it, expect } from 'vitest';
import {
    isCustomerSignInResult,
    isErrorWithMessage,
    isDuplicateEmailError,
    isTokenResponse,
    isErrorResponse,
    isLocalizedString,
    isPlainEnumValue,
    isLocalizedEnumValue,
} from '../type-guards';
import { LocalizedString } from '@commercetools/platform-sdk';
import { ErrorResponse } from '../../types';

describe('Test type guards functions', () => {
    describe('isCustomerSignInResult', () => {
        it('should return true for valid UserDataLS', () => {
            const data = {
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                id: '123',
                createdAt: '2023-01-01T00:00:00Z',
            };
            expect(isCustomerSignInResult(data)).toBe(true);
        });

        it('should return false for invalid UserDataLS', () => {
            const data = { email: 'test@example.com' }; // Missing required fields
            expect(isCustomerSignInResult(data)).toBe(false);
        });
    });

    describe('isErrorWithMessage', () => {
        it('should return true for error objects with message', () => {
            const error = { message: 'An error occurred' };
            expect(isErrorWithMessage(error)).toBe(true);
        });

        it('should return false for objects without message', () => {
            const error = {};
            expect(isErrorWithMessage(error)).toBe(false);
        });
    });

    describe('Test isDuplicateEmailError function', () => {
        it('should return false when message is not a string', () => {
            const error = {
                code: 'DuplicateField',
                message: 123, // Not a string
            };
            expect(isDuplicateEmailError(error)).toBe(false);
        });

        it('should return false when message does not include "email"', () => {
            const error = {
                code: 'DuplicateField',
                message: 'Duplicate field', // Missing "email"
            };
            expect(isDuplicateEmailError(error)).toBe(false);
        });

        it('should return false for non-duplicate email errors', () => {
            const error = {
                code: 'OtherError',
                message: 'Something else',
            };
            expect(isDuplicateEmailError(error)).toBe(false);
        });

        it('should return false when message is missing', () => {
            const error = {
                code: 'DuplicateField',
                // No message property
            };
            expect(isDuplicateEmailError(error)).toBe(false);
        });
    });

    describe('isTokenResponse', () => {
        it('should return true for valid TokenResponse', () => {
            const tokenResponse = {
                access_token: 'abc123',
                refresh_token: 'def456',
                expires_in: 3600,
                scope: 'read write',
                token_type: 'Bearer',
            };
            expect(isTokenResponse(tokenResponse)).toBe(true);
        });

        it('should return false for invalid TokenResponse', () => {
            const tokenResponse = { access_token: 'abc123' }; // Missing required fields
            expect(isTokenResponse(tokenResponse)).toBe(false);
        });
    });

    describe('isErrorResponse', () => {
        it('should return true for valid ErrorResponse', () => {
            const errorResponse: ErrorResponse = {
                message: 'An error occurred',
                error: 'InvalidRequest',
                error_description: 'The request is invalid',
                errors: [{ code: 'code1', message: 'Error message' }],
            };
            expect(isErrorResponse(errorResponse)).toBe(true);
        });
    });

    describe('isLocalizedString', () => {
        it('should return true for valid LocalizedString', () => {
            const localized: LocalizedString = { en: 'Hello', fr: 'Bonjour' };
            expect(isLocalizedString(localized)).toBe(true);
        });

        it('should return false for invalid LocalizedString', () => {
            const localized = { fr: 'Bonjour' }; // Missing 'en'
            expect(isLocalizedString(localized)).toBe(false);
        });
    });

    describe('isPlainEnumValue', () => {
        it('should return true for valid plain enum value', () => {
            const enumValue = { key: 'value1' };
            expect(isPlainEnumValue(enumValue)).toBe(true);
        });

        it('should return false for invalid plain enum value', () => {
            const enumValue = { value: 'value1' }; // Missing 'key'
            expect(isPlainEnumValue(enumValue)).toBe(false);
        });
    });

    describe('isLocalizedEnumValue', () => {
        it('should return true for valid localized enum value', () => {
            const localizedEnumValue = { key: 'value1', label: { en: 'Value 1', fr: 'Valeur 1' } };
            expect(isLocalizedEnumValue(localizedEnumValue)).toBe(true);
        });

        it('should return false for invalid localized enum value', () => {
            const localizedEnumValue = { key: 'value1', label: { fr: 'Valeur 1' } }; // Missing 'en'
            expect(isLocalizedEnumValue(localizedEnumValue)).toBe(false);
        });
    });
});
