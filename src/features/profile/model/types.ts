import type { Customer } from '@commercetools/platform-sdk';

export type ProfileState = {
    customer: Customer | null;
    defaultShippingAddressId: string;
    defaultBillingAddressId: string;
};
