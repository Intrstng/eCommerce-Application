import { describe, it, expect } from 'vitest';
import { customSliceString } from '../custom-slice-string';

describe('Test customSliceString function', () => {
    const STRING_VALUE: string = 'Melchior Comet Stud Earrings';
    const STRING_VALUE_SHORT: string = 'Melchior';
    const STRING_VALUE_SHORT_LENGTH: number = STRING_VALUE_SHORT.length;

    it('should return the original string if it is shorter than the specified length', () => {
        const result = customSliceString(STRING_VALUE_SHORT, STRING_VALUE_SHORT_LENGTH + 1);
        expect(result).toBe(STRING_VALUE_SHORT);
    });

    it('should return the original string if it is equal to the specified length', () => {
        const result = customSliceString(STRING_VALUE_SHORT, STRING_VALUE_SHORT_LENGTH);
        expect(result).toBe(STRING_VALUE_SHORT);
    });

    it('should slice the string and add "..." if it is longer than the specified length', () => {
        const result = customSliceString(STRING_VALUE, STRING_VALUE_SHORT_LENGTH);
        expect(result).toBe(`${STRING_VALUE_SHORT}...`);
    });

    it('should handle an empty string gracefully', () => {
        const result = customSliceString('', STRING_VALUE_SHORT_LENGTH);
        expect(result).toBe('');
    });

    it('should handle a length of zero', () => {
        const result = customSliceString(STRING_VALUE, 0);
        expect(result).toBe('...');
    });
});
