import type { DiscountCartInfo } from '../types';

export function parseDiscount(discountString?: string): DiscountCartInfo {
    if (!discountString) {
        return { discountPercent: '0', discountText: '' };
    }

    const match = /(\d+)%\s*(.*)/.exec(discountString);

    if (match) {
        return {
            discountPercent: `${match[1]}%`,
            discountText: match[2].trim(),
        };
    }

    return { discountPercent: '0%', discountText: '' };
}
