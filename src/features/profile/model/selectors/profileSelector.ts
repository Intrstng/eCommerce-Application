import type { Customer } from '@commercetools/platform-sdk';
import type { AppRootState } from 'app/store';

export const profileCustomerSelector = (state: AppRootState): Customer | null => state.profile.customer;
