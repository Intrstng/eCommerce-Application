import type { Customer } from '@commercetools/platform-sdk';
import type { AppRootState } from 'app/store';

export const profileCustomerSelector = (state: AppRootState): Customer | null => state.profile.customer;
export const profileDefaultShippingAddressIdSelector = (state: AppRootState): string =>
    state.profile.defaultShippingAddressId;
export const profileDefaultBillingAddressIdSelector = (state: AppRootState): string =>
    state.profile.defaultBillingAddressId;
