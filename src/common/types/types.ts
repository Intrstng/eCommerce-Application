import type { CustomerSignInResult } from '@commercetools/platform-sdk';

export type Address = {
    country: string;
    streetName: string;
    postalCode: string;
    city: string;
};

export type LoginParametersType = {
    email: string;
    password: string;
};

export type User = {
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
};

export type AuthState = {
    user: CustomerSignInResult | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
};
