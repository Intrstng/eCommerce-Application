import { describe, it, expect } from 'vitest';
import { compareDiscountsAsc } from '../compare-discounts';
import { PromoCodeCartContent } from '../../types';

describe('Test compareDiscountsAsc function', () => {
    it('should return a negative number when the first discount is less than the second', () => {
        const promoA: PromoCodeCartContent = {
            id: '1',
            isActive: true,
            key: 'CODE1',
            code: 'CODE1',
            description: '',
            discountPercent: '10%',
            discountText: '',
            validFrom: '',
            validUntil: '',
        };
        const promoB: PromoCodeCartContent = {
            id: '2',
            isActive: true,
            key: 'CODE2',
            code: 'CODE2',
            description: '',
            discountPercent: '20%',
            discountText: '',
            validFrom: '',
            validUntil: '',
        };

        const result = compareDiscountsAsc(promoA, promoB);
        expect(result).toBeLessThan(0);
    });

    it('should return a positive number when the first discount is greater than the second', () => {
        const promoCodes: PromoCodeCartContent[] = [
            {
                id: '1',
                isActive: true,
                key: 'CODE1',
                code: 'CODE1',
                description: '',
                discountPercent: '30%',
                discountText: '',
                validFrom: '',
                validUntil: '',
            },
            {
                id: '2',
                isActive: true,
                key: 'CODE2',
                code: 'CODE2',
                description: '',
                discountPercent: '20%',
                discountText: '',
                validFrom: '',
                validUntil: '',
            },
        ];

        const result = compareDiscountsAsc(promoCodes[0], promoCodes[1]);
        expect(result).toBeGreaterThan(0);
    });

    it('should return 0 when both discounts are equal', () => {
        const DISCOUNT: string = '20%';

        const equalPromoCodes: PromoCodeCartContent[] = [
            {
                id: '1',
                isActive: true,
                key: 'CODE1',
                code: 'CODE1',
                description: '',
                discountPercent: DISCOUNT,
                discountText: '',
                validFrom: '',
                validUntil: '',
            },
            {
                id: '2',
                isActive: true,
                key: 'CODE2',
                code: 'CODE2',
                description: '',
                discountPercent: DISCOUNT,
                discountText: '',
                validFrom: '',
                validUntil: '',
            },
        ];

        const result = compareDiscountsAsc(equalPromoCodes[0], equalPromoCodes[1]);
        expect(result).toBe(0);
    });

    it('should handle invalid discountPercent gracefully', () => {
        const invalidPromoCodes: PromoCodeCartContent[] = [
            {
                id: '1',
                isActive: true,
                key: 'CODE1',
                code: 'CODE1',
                description: '',
                discountPercent: 'invalid%',
                discountText: '',
                validFrom: '',
                validUntil: '',
            },
            {
                id: '2',
                isActive: true,
                key: 'CODE2',
                code: 'CODE2',
                description: '',
                discountPercent: '30%',
                discountText: '',
                validFrom: '',
                validUntil: '',
            },
        ];

        const result = compareDiscountsAsc(invalidPromoCodes[0], invalidPromoCodes[1]);
        expect(result).toBeNaN();
    });
});
