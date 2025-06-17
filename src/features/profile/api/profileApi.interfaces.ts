import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export interface UpdateCustomerActions {
    version: number;
    actions: MyCustomerUpdateAction[];
}
