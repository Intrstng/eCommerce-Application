export interface Address {
    country: string;
    streetName: string;
    postalCode: string;
    city: string;
}

export interface EditAddressData {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface AddressData extends Address {
    id: string;
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
    defaultShippingAddress: number | undefined;
    defaultBillingAddress: number | undefined;
    shippingAddresses: number[];
    billingAddresses: number[];
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
}

export interface ErrorResponse {
    message?: string;
    error?: string;
    error_description?: string;
    errors?: {
        code: string;
        message: string;
    }[];
}

export interface Attribute {
    name: string;
    value: {
        key: string;
        label?: string;
    };
}

export interface FilterParameters {
    gender: string | null;
    material: string | null;
    search: string | null;
    sort: string | null;
    type: string | null;
}

export interface DiscountCartInfo {
    discountPercent: string;
    discountText: string;
}

export interface PromoCodeCartContent {
    id: string;
    isActive: boolean;
    key: string;
    code: string;
    description: string;
    discountPercent: string;
    discountText: string;
    validFrom: string;
    validUntil: string;
}
