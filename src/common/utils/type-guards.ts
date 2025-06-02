import type { ErrorResponse, TokenResponse, UserDataLS } from '../types';

const isObject = (value: unknown): value is object => value !== null && typeof value === 'object';
const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export function isCustomerSignInResult(data: unknown): data is UserDataLS {
    return (
        typeof data === 'object' &&
        data !== null &&
        'email' in data &&
        typeof data.email === 'string' &&
        'firstName' in data &&
        typeof data.firstName === 'string' &&
        'lastName' in data &&
        typeof data.lastName === 'string' &&
        'id' in data &&
        typeof data.id === 'string' &&
        'createdAt' in data &&
        typeof data.createdAt === 'string'
    );
}

export const isErrorWithMessage = (error: unknown): error is { message: string } =>
    isObject(error) && 'message' in error && isString(error.message);

export const isDuplicateEmailError = (error: unknown): error is { code: string; message: string } =>
    isObject(error) &&
    'code' in error &&
    'message' in error &&
    error.code === 'DuplicateField' &&
    isString(error.message) &&
    error.message.includes('email');

export const isTokenResponse = (value: unknown): value is TokenResponse =>
    isObject(value) &&
    'access_token' in value &&
    'refresh_token' in value &&
    'expires_in' in value &&
    'scope' in value &&
    'token_type' in value &&
    isString(value.access_token) &&
    isString(value.refresh_token) &&
    isNumber(value.expires_in) &&
    isString(value.scope) &&
    isString(value.token_type);

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
    if (!isObject(value)) return false;

    const hasMessage = 'message' in value ? isString(value.message) : true;
    const hasError = 'error' in value ? isString(value.error) : true;
    const hasErrorDesc = 'error_description' in value ? isString(value.error_description) : true;
    const hasErrors = 'errors' in value ? isArray(value.errors) : true;

    return (hasMessage || hasError || hasErrorDesc || hasErrors) && hasMessage && hasError && hasErrorDesc && hasErrors;
};

import type { LocalizedString } from '@commercetools/platform-sdk';

export const isLocalizedString = (value: unknown): value is LocalizedString => {
    return !!value && typeof value === 'object' && 'en' in value && typeof value.en === 'string';
};

export const isPlainEnumValue = (value: unknown): value is { key: string } => {
    return !!value && typeof value === 'object' && 'key' in value && typeof value.key === 'string';
};

export const isLocalizedEnumValue = (value: unknown): value is { key: string; label: LocalizedString } => {
    if (!value || typeof value !== 'object') return false;
    if (!('key' in value) || !('label' in value)) return false;
    if (typeof value.key !== 'string') return false;
    const label = value.label;
    if (!label || typeof label !== 'object') return false;
    if (!('en' in label)) return false;
    return typeof label.en === 'string';
};
