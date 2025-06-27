import type { Address } from '@commercetools/platform-sdk';
import type { AddressModalFormData } from '../../validations/addressModalFormValidation.schema';
import type { AddressModalType, AddressStatus } from '../../enums';

export type AddressCardProps = {
    address: Address;
    deleteAddressCB: (addressId: string) => void;
    editAddressCB: (address: AddressModalFormData, addressId: string) => void;
    toggleStatusAddressesCB: (
        isShipping: AddressStatus,
        isBilling: AddressStatus,
        addressId: string,
        addressToToggle: AddressModalType
    ) => void;
    toggleIsDefaultAddressesCB: (
        isDefaultShippingAddress: AddressStatus,
        isDefaultBillingAddress: AddressStatus,
        addressId: string,
        addressToToggle: AddressModalType
    ) => void;
    shippingAddressIds: string[];
    billingAddressIds: string[];
};
