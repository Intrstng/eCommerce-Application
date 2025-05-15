import type { CustomerSignInResult } from '@commercetools/platform-sdk';

export interface Address {
    country: string;
    streetName: string;
    postalCode: string;
    city: string;
}

export interface LoginParameters {
    email: string;
    password: string;
}

export interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: Address[];
    defaultShippingAddress?: number;
    defaultBillingAddress?: number;
    shippingAddresses?: number[];
    billingAddresses?: number[];
}

export interface AuthState {
    user: CustomerSignInResult | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}
