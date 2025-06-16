import type { AppRootState } from 'app/store';
import type { DiscountCode } from '@commercetools/platform-sdk';
import type { PromoCodeCartContent } from '../../../../common/types';

export const promoCodeSelector = (state: AppRootState): PromoCodeCartContent | null => state.discount.promoCode;
export const availablePromoCodesSelector = (state: AppRootState): DiscountCode[] => state.discount.availablePromoCodes;
