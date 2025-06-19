import { describe, it, expect, vi } from 'vitest';
import type { Cart, DiscountCode } from '@commercetools/platform-sdk';
import { checkIsPromoCodeApplied } from '../check-is-promocode-applied';
import type { PromoCodeCartContent } from '../../types';

vi.mock('../find-current-promocode-id-by-code-name', () => ({
    findCurrentPromoCodeIdByCodeName: (availablePromoCodes: DiscountCode[], promoCodeName: string) => {
        const promoCode = availablePromoCodes.find(code => code.code === promoCodeName);
        return promoCode ? promoCode.id : '';
    },
}));

describe('Test checkIsPromoCodeApplied function', () => {
    const availablePromoCodes: DiscountCode[] = [
        {
            id: 'promo1',
            key: 'SUMMER10',
            code: 'SUMMER10',
            version: 1,
            createdAt: '',
            lastModifiedAt: '',
            isActive: true,
            cartDiscounts: [],
            references: [],
            groups: [],
            validFrom: '',
            validUntil: '',
        },
        {
            id: 'promo2',
            key: 'SPRING5',
            code: 'SPRING5',
            version: 1,
            createdAt: '',
            lastModifiedAt: '',
            isActive: true,
            cartDiscounts: [],
            references: [],
            groups: [],
            validFrom: '',
            validUntil: '',
        },
    ];

    const currentPromoCode: PromoCodeCartContent = {
        id: 'promo1',
        isActive: true,
        key: 'SUMMER10',
        code: 'SUMMER10',
        description: '',
        discountPercent: '10',
        discountText: '10% discount all summer long',
        validFrom: '',
        validUntil: '',
    };

    const cart: Cart = {
        discountCodes: [{ discountCode: { id: 'promo1' } }, { discountCode: { id: 'promo3' } }],
    } as Cart;

    it('should return false if no promo code name and current promo code are provided', () => {
        const result = checkIsPromoCodeApplied('', null, availablePromoCodes, cart);
        expect(result).toBe(false);
    });

    it('should return false if promo code name is provided but not in the cart', () => {
        const result = checkIsPromoCodeApplied(currentPromoCode.key, null, availablePromoCodes, cart);
        expect(result).toBe(false);
    });

    it('should return true if the current promo code matches a promo code in the cart', () => {
        const result = checkIsPromoCodeApplied(currentPromoCode.key, currentPromoCode, availablePromoCodes, cart);
        expect(result).toBe(true);
    });

    it('should return false if the promo code ID cannot be found', () => {
        const result = checkIsPromoCodeApplied(currentPromoCode.key, currentPromoCode, [], cart);
        expect(result).toBe(false);
    });

    it('should return false if the promo code ID cannot be found', () => {
        const result = checkIsPromoCodeApplied(currentPromoCode.key, currentPromoCode, [], cart);
        expect(result).toBe(false);
    });

    it('should return false if the cart is null', () => {
        const result = checkIsPromoCodeApplied('SAVE10', currentPromoCode, availablePromoCodes, null);
        expect(result).toBe(false);
    });
});
