import type { AppRootState } from 'app/store';
import type { PromoCodes } from '../../../../common/enums';
import type { DiscountCode } from '@commercetools/platform-sdk';

export const promoCodeSelector = (state: AppRootState): PromoCodes | '' => state.discount.promoCode;
export const availablePromoCodesSelector = (state: AppRootState): DiscountCode[] => state.discount.availablePromoCodes;
