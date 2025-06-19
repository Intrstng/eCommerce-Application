import type { DiscountCode } from '@commercetools/platform-sdk';
import type { PromoCodeCartContent } from '../types';
import { parseDiscount } from './parse-discount';
import { formatDateString } from './format-date';
import { discountAPI } from '../../features/discount/api/discountApi';
import { replaceAllQuotes } from './replace-all-quotes';

export async function transformToPromoCodeCartContent(discountCode: DiscountCode): Promise<PromoCodeCartContent> {
    const { discountPercent = '0%', discountText = '' } = parseDiscount(discountCode.name?.en);
    let productTypeIds: string[] = [];

    if (discountCode.cartDiscounts?.[0]?.id) {
        const cartDiscount = await discountAPI.getCartDiscountById(discountCode.cartDiscounts[0].id);
        if (cartDiscount.target && 'predicate' in cartDiscount.target) {
            const predicate = cartDiscount.target.predicate;
            const regex1 = /productType\.id = \(([^)]+)\)/;
            const regex2 = /productType\.id = "([^"]+)"/;
            const matchTypeId = regex1.exec(predicate) || regex2.exec(predicate);
            if (matchTypeId) {
                productTypeIds = replaceAllQuotes(matchTypeId[1])
                    .split(',')
                    .map((id: string) => id.trim());
            }
        }
    }

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
