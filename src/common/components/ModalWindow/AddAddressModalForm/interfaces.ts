import type { AddressModalType } from '../../../enums';
import type { AddressModalFormData } from '../../../validations/addressModalFormValidation.schema';

export interface AddAddressModalFormProps {
    modalType: AddressModalType | null;
    closeModalCB: () => void;
    addAddressCB: (address?: AddressModalFormData, addressId?: string) => void;
}
