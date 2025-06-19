import { describe, it, expect } from 'vitest';
import type { DiscountCode } from '@commercetools/platform-sdk';
import { findCurrentPromoCodeIdByCodeName } from '../find-current-promocode-id-by-code-name';

describe('Test findCurrentPromoCodeIdByCodeName function', () => {
    const mockPromoCodes: DiscountCode[] = [
        {
            id: '1',
            key: 'SUMMER2025',
            version: 1,
            createdAt: '2025-06-19T11:51:23.408Z',
            lastModifiedAt: '2025-06-19T11:51:23.408Z',
            code: 'SUMMER2025',
            cartDiscounts: [],
            isActive: true,
            references: [],
            groups: [],
        },
        {
            id: '2',
            key: 'WINTER2025',
            version: 1,
            createdAt: '2025-01-01T11:51:23.408Z',
            lastModifiedAt: '2025-01-01T11:51:23.408Z',
            code: 'WINTER2025',
            cartDiscounts: [],
            isActive: true,
            references: [],
            groups: [],
        },
    ];

    it('should return the correct promo code ID by key', () => {
        const result = findCurrentPromoCodeIdByCodeName(mockPromoCodes, 'SUMMER2025');
        expect(result).toBe('1');
    });

    it('should return the correct promo code ID by code', () => {
        const result = findCurrentPromoCodeIdByCodeName(mockPromoCodes, 'WINTER2025');
        expect(result).toBe('2');
    });

    it('should return an empty string if the promo code does not exist', () => {
        const result = findCurrentPromoCodeIdByCodeName(mockPromoCodes, 'SPRING2025');
        expect(result).toBe('');
    });

    it('should return an empty string if the promo code is inactive', () => {
        const inactivePromoCodes: DiscountCode[] = [
            {
                id: '3',
                key: 'FALL2024',
                version: 1,
                createdAt: '2024-09-01T11:51:23.408Z',
                lastModifiedAt: '2024-09-01T11:51:23.408Z',
                code: 'FALL2024',
                cartDiscounts: [],
                isActive: false,
                references: [],
                groups: [],
            },
        ];

        const result = findCurrentPromoCodeIdByCodeName(inactivePromoCodes, 'FALL2025');
        expect(result).toBe('');
    });
});
