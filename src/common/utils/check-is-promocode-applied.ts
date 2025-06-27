import type { PromoCodeCartContent } from '../types';
import type { Cart, DiscountCode } from '@commercetools/platform-sdk';
import { findCurrentPromoCodeIdByCodeName } from './find-current-promocode-id-by-code-name';

export const checkIsPromoCodeApplied = (
    promoCodeName: string,
    currentPromoCode: PromoCodeCartContent | null,
    availablePromoCodes: DiscountCode[],
    cart: Cart | null
): boolean => {
    if ((!promoCodeName && !currentPromoCode) || !promoCodeName || !currentPromoCode) {
        return false;
    }

    const promoCodeNameToCheck: string = promoCodeName || currentPromoCode?.key || currentPromoCode?.code || '';
    const promoCodeIdToCheck: string = findCurrentPromoCodeIdByCodeName(availablePromoCodes, promoCodeNameToCheck);

    if (!promoCodeIdToCheck || promoCodeIdToCheck === '') {
        return false;
    }

    return cart?.discountCodes.some(promoCode => promoCode.discountCode.id === promoCodeIdToCheck) ?? false;
};
