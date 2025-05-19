import type { Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { TokenResponse, ErrorResponse } from '../types';

const isObject = (value: unknown): value is object => value !== null && typeof value === 'object';
const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export function isCustomer(value: unknown): value is Customer {
    return value !== null && typeof value === 'object' && 'id' in value && typeof value.id === 'string';
}

export function isCustomerSignInResult(data: unknown): data is CustomerSignInResult {
    return data !== null && typeof data === 'object' && 'customer' in data && isCustomer(data.customer);
}

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
