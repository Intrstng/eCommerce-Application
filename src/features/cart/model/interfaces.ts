import type { Cart } from '@commercetools/platform-sdk';
import type { Status } from 'app/model/types';

export interface CartState {
    cart: Cart | null;
    status: Status;
}
