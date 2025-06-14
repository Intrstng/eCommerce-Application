import type { Cart } from '@commercetools/platform-sdk';
import type { Status } from 'app/model/types';
import type { PromoCodes } from '../../../common/enums';

export interface CartState {
    cart: Cart | null;
    status: Status;
    promoCode: PromoCodes | '';
}
