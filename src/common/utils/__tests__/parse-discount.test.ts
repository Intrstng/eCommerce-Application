import { describe, it, expect } from 'vitest';
import { DiscountCartInfo } from '../../types';
import { parseDiscount } from '../parse-discount';

describe('Test parseDiscount function', () => {
    const testCases: {
        description: string;
        input: string | undefined;
        expected: DiscountCartInfo;
    }[] = [
        {
            description: 'should return default values for undefined input',
            input: undefined,
            expected: { discountPercent: '0', discountText: '' },
        },
        {
            description: 'should return default values for empty string',
            input: '',
            expected: { discountPercent: '0', discountText: '' },
        },
        {
            description: 'should parse percentage only',
            input: '10%',
            expected: { discountPercent: '10%', discountText: '' },
        },
        {
            description: 'should parse percentage with text',
            input: '15% Summer Sale',
            expected: { discountPercent: '15%', discountText: 'Summer Sale' },
        },
        {
            description: 'should parse percentage with extra spaces',
            input: '  20%   Extra Discount   ',
            expected: { discountPercent: '20%', discountText: 'Extra Discount' },
        },
        {
            description: 'should handle malformed input (missing %)',
            input: '25 Discount',
            expected: { discountPercent: '0%', discountText: '' },
        },
        {
            description: 'should handle malformed input (text before percentage)',
            input: 'Special 30%',
            expected: { discountPercent: '0%', discountText: '' },
        },
        {
            description: 'should handle multiple percentage signs',
            input: '40%% Extra',
            expected: { discountPercent: '40%', discountText: '% Extra' },
        },
    ];

    testCases.forEach(({ description, input, expected }) => {
        it(description, () => {
            const result = parseDiscount(input);
            expect(result).toEqual(expected);
        });
    });

    it('should return discountPercent as string with % when percentage is found', () => {
        const result = parseDiscount('50% Off');
        expect(result.discountPercent).toBe('50%');
        expect(typeof result.discountPercent).toBe('string');
    });

    it('should trim whitespace from discountText', () => {
        const result = parseDiscount('5%   Limited Time   ');
        expect(result.discountText).toBe('Limited Time');
    });

    it('should handle whitespace-only strings', () => {
        const testCases = [
            { input: ' ', expected: { discountPercent: '0', discountText: '' } },
            { input: '  ', expected: { discountPercent: '0', discountText: '' } },
            { input: '\t', expected: { discountPercent: '0', discountText: '' } },
            { input: '\n', expected: { discountPercent: '0', discountText: '' } },
        ];

        testCases.forEach(({ input, expected }) => {
            const result = parseDiscount(input);
            expect(result).toEqual(expected);
        });
    });
});
