import type { Address } from '@commercetools/platform-sdk';
import type { AddressModalFormData } from '../../validations/addressModalFormValidation';

export type AddressCardProps = {
    address: Address;
    deleteAddressCB: (addressId: string) => void;
    editAddressCB: (address: AddressModalFormData, addressId: string) => void;
    toggleDefaultAddressesCB: (isDefaultShipping: boolean, isDefaultBilling: boolean, addressId: string) => void;
    shippingAddressIds: string[];
    billingAddressIds: string[];
};
