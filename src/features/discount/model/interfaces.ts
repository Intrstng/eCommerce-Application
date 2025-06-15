import type { PromoCodes } from '../../../common/enums';
import type { DiscountCode } from '@commercetools/platform-sdk';

export interface DiscountState {
    promoCode: PromoCodes | '';
    availablePromoCodes: DiscountCode[];
}
