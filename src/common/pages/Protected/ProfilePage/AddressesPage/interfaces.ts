export interface AddAddressAction {
    action: 'addAddress';
    address: {
        streetName: string;
        city: string;
        postalCode: string;
        country: string;
    };
}
