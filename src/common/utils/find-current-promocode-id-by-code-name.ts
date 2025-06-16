import type { DiscountCode } from '@commercetools/platform-sdk';

export const findCurrentPromoCodeIdByCodeName = (availablePromoCodes: DiscountCode[], codeName: string): string => {
    const promoCodeToCancel: DiscountCode | undefined = availablePromoCodes.find(
        availablePromoCode => availablePromoCode.key === codeName || availablePromoCode.code === codeName
    );

    if (promoCodeToCancel) {
        return promoCodeToCancel.id ?? '';
    }
    return '';
};
