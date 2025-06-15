import type { AppRootState } from 'app/store';
import type { Cart } from '@commercetools/platform-sdk';
import type { Status } from 'app/model/types';

export const cartSelector = (state: AppRootState): Cart | null => state.cart.cart;
export const cartStatusSelector = (state: AppRootState): Status => state.cart.status;
