import type { DiscountCode } from '@commercetools/platform-sdk';
import type { PromoCodeCartContent } from '../../../common/types';

export interface DiscountState {
    promoCode: PromoCodeCartContent | null;
    availablePromoCodes: DiscountCode[];
}
