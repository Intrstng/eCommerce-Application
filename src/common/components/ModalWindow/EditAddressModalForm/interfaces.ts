import type { AddressModalFormData } from '../../../validations/addressModalFormValidation.schema';

export interface EddAddressModalFormProps {
    addressId?: string;
    closeModalCB: () => void;
    editAddressCB: (address: AddressModalFormData, addressId: string) => void;
}
