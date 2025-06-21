import type { PromoCodeCartContent } from '../types';

export function compareDiscountsAsc(a: PromoCodeCartContent, b: PromoCodeCartContent): number {
    return Number(a.discountPercent.slice(0, -1)) - Number(b.discountPercent.slice(0, -1));
}
