export type Address = {
    country: string;
    streetName: string;
    postalCode: string;
    city: string;
};

export type User = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    addresses: Address[];
    defaultShippingAddress: 0 | 1;
    defaultBillingAddress: 0 | 1;
};
