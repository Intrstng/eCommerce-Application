import { describe, it, expect } from 'vitest';
import { isValidUUID } from '../validate-uuid';
import { v4 } from 'uuid';
import { v1 } from 'uuid';

describe('Test isValidUUID function', () => {
    const validUUIDs = [v1(), v1(), v4(), v4()];

    const invalidUUIDs = [
        '', // empty string
        '123', // too short
        '123e4567-e89b-12d3-a456-4266141740000', // too long for UUID
        '123e4567-e89b-12d3-a456-42661417400g', // invalid character (g) in UUID
        '123e4567-e89b-12d3-a456-42661417400', // missing character in UUID
        '123e4567-e89b-12d3-a456_426614174000', // invalid character (_) in UUID
        '123e4567-e89b-12d3-a456-426614174000 ', // trailing space in UUID
        ' 123e4567-e89b-12d3-a456-426614174000', // leading space in UUID
        '123e4567-e89b-12d3-a456-42661417400', // missing last character in UUID
        '123e4567-e89b-12d3-a456-42661417400', // missing last character in UUID
        'G23e4567-e89b-12d3-a456-426614174000', // invalid starting character (G) in UUID
        '6ba7b810-9dad-61d1-80b4-00c04fd430c8', // invalid version (6) of UUID
        '6ba7b810-9dad-11d1-c0b4-00c04fd430c8', // invalid variant (c) of UUID
    ];

    validUUIDs.forEach(uuid => {
        it(`should return true for valid UUID: ${uuid}`, () => {
            expect(isValidUUID(uuid)).toBe(true);
        });
    });

    invalidUUIDs.forEach(uuid => {
        it(`should return false for invalid UUID: ${uuid || 'empty string'}`, () => {
            expect(isValidUUID(uuid)).toBe(false);
        });
    });

    it('should handle non-string inputs', () => {
        expect(isValidUUID(null)).toBe(false);
        expect(isValidUUID(undefined)).toBe(false);
        expect(isValidUUID(123)).toBe(false);
        expect(isValidUUID({})).toBe(false);
    });
});
