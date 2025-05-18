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
    defaultShippingAddress: number | undefined; // ?:
    defaultBillingAddress: number | undefined; // ?:
    shippingAddresses: number[]; // ?:
    billingAddresses: number[]; // ?:
}
