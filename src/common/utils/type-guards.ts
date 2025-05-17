import type { Customer, CustomerSignInResult } from '@commercetools/platform-sdk';

export function isCustomer(value: unknown): value is Customer {
    return value !== null && typeof value === 'object' && 'id' in value && typeof value.id === 'string';
}

export function isCustomerSignInResult(data: unknown): data is CustomerSignInResult {
    return data !== null && typeof data === 'object' && 'customer' in data && isCustomer(data.customer);
}
