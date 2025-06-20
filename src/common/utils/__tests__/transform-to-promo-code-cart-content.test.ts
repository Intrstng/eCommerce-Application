import { describe, expect, it, vi } from 'vitest';
import { transformToPromoCodeCartContent } from '../transform-to-promo-code-cart-content';
import { DiscountCode } from '@commercetools/platform-sdk';
import { parseDiscount } from '../parse-discount';

vi.mock('../parse-discount', () => ({
    parseDiscount: vi.fn().mockImplementation(input => {
        if (!input)
            return {
                discountPercent: '0%',
                discountText: '',
            };
        if (input === '10% Discount')
            return {
                discountPercent: '10%',
                discountText: '10% off',
            };
        return {
            discountPercent: '0%',
            discountText: '',
        };
    }),
}));

vi.mock('../format-date', () => ({
    formatDateString: vi.fn().mockImplementation(date => date || ''),
}));

describe.skip('Test transformToPromoCodeCartContent function', () => {
    const baseDiscountCode: DiscountCode = {
        id: 'discount-123',
        version: 1,
        createdAt: '2025-01-01T00:00:00Z',
        lastModifiedAt: '2025-01-02T00:00:00Z',
        code: 'DISCOUNT10',
        isActive: true,
        cartDiscounts: [],
        references: [],
        groups: [],
    };

    it('should handle undefined name.en gracefully', () => {
        const discountCode = {
            ...baseDiscountCode,
            name: undefined,
            description: { en: 'Test description' },
        };

        const result = transformToPromoCodeCartContent(discountCode);

        expect(result).toEqual({
            id: 'discount-123',
            isActive: true,
            key: '',
            code: 'DISCOUNT10',
            description: 'Test description',
            discountPercent: '0%',
            discountText: '',
            validFrom: '',
            validUntil: '',
        });

        expect(parseDiscount).toHaveBeenCalledWith(undefined);
    });

    it('should handle null name.en gracefully', () => {
        const discountCode = {
            ...baseDiscountCode,
            name: { en: null } as unknown as LocalizedString,
            description: { en: 'Test description' },
        };

        const result = transformToPromoCodeCartContent(discountCode);
        expect(result.discountPercent).toBe('0%');
        expect(result.discountText).toBe('');
    });

    it('should handle empty name.en string', () => {
        const discountCode = {
            ...baseDiscountCode,
            name: { en: '' },
            description: { en: 'Test description' },
        };

        const result = transformToPromoCodeCartContent(discountCode);
        expect(result.discountPercent).toBe('0%');
        expect(result.discountText).toBe('');
    });

    it('should handle empty key', () => {
        const discountCode = {
            ...baseDiscountCode,
            key: undefined,
        };
        const result = transformToPromoCodeCartContent(discountCode);
        expect(result.key).toBe('');
    });

    it('should handle undefined parseDiscount result', () => {
        vi.mocked(parseDiscount).mockReturnValueOnce(undefined);
        const result = transformToPromoCodeCartContent(baseDiscountCode);
        expect(result.discountPercent).toBe('0%');
        expect(result.discountText).toBe('');
    });
});
