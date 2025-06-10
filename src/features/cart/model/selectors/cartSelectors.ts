import type { AppRootState } from 'app/store';
import type { LineItem } from '@commercetools/platform-sdk';

export const cartLineItemsSelector = (state: AppRootState): LineItem[] => state.cart.cart?.lineItems || [];
