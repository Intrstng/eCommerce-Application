import type { Address } from '@commercetools/platform-sdk';
import type { AddressModalFormData } from '../../validations/addressModalFormValidation';
import type { AddressModalType, DefaultAddressStatus } from '../../enums';

export type AddressCardProps = {
    address: Address;
    deleteAddressCB: (addressId: string) => void;
    editAddressCB: (address: AddressModalFormData, addressId: string) => void;
    toggleDefaultAddressesCB: (
        isDefaultShipping: DefaultAddressStatus,
        isDefaultBilling: DefaultAddressStatus,
        addressId: string,
        addressToToggle: AddressModalType
    ) => void;
    shippingAddressIds: string[];
    billingAddressIds: string[];
};
