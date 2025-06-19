import type { DiscountCode } from '@commercetools/platform-sdk';
import type { PromoCodeCartContent } from '../types';
import { parseDiscount } from './parse-discount';
import { formatDateString } from './format-date';

export function transformToPromoCodeCartContent(discountCode: DiscountCode): PromoCodeCartContent {
    const { discountPercent = '0%', discountText = '' } = parseDiscount(discountCode.name?.en) || {};

    return {
        id: discountCode.id,
        isActive: discountCode.isActive,
        key: discountCode.key ?? '',
        code: discountCode.code,
        description: discountCode.description?.en ?? '',
        discountPercent,
        discountText,
        validFrom: formatDateString(discountCode.validFrom),
        validUntil: formatDateString(discountCode.validUntil),
    };
}
