import { describe, it, expect } from 'vitest';
import { formatDateString } from '../format-date';

describe('Test formatDateString function', () => {
    it('should return an empty string for undefined input', () => {
        const result = formatDateString(undefined);
        expect(result).toBe('');
    });

    it('should return an empty string for empty string input', () => {
        const result = formatDateString('');
        expect(result).toBe('');
    });

    it('should return an empty string for invalid date string', () => {
        const result = formatDateString('invalid-date');
        expect(result).toBe('');
    });

    it('should format a valid date string correctly', () => {
        const result = formatDateString('2025-01-02T00:00:00Z');
        expect(result).toBe('JANUARY 2');
    });

    it('should format another valid date string correctly', () => {
        const result = formatDateString('2024-12-25T00:00:00Z');
        expect(result).toBe('DECEMBER 25');
    });

    it('should format a date with local timezone correctly', () => {
        const result = formatDateString(new Date().toISOString());
        expect(result).not.toBe('');
    });
});
