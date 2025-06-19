import { describe, it, expect } from 'vitest';
import { genStyles } from '../generate-styles';

describe('Test genStyles function', () => {
    it('should return the same styles object', () => {
        const styles = {
            button: {
                backgroundColor: 'blue',
                color: 'white',
            },
            text: {
                fontSize: '16px',
                margin: '10px',
            },
        };

        const result = genStyles(styles);
        expect(result).toEqual(styles);
    });

    it('should handle empty styles object', () => {
        const styles = {};
        const result = genStyles(styles);
        expect(result).toEqual({});
    });

    it('should support nested style objects', () => {
        const styles = {
            card: {
                border: '1px solid black',
                padding: '10px',
                hover: {
                    backgroundColor: 'lightgray',
                },
            },
        };

        const result = genStyles(styles);
        expect(result).toEqual(styles);
    });

    it('should return the same reference for the same input', () => {
        const styles = {
            header: {
                fontSize: '20px',
            },
        };

        const result1 = genStyles(styles);
        const result2 = genStyles(styles);
        expect(result1).toBe(result2);
    });
});
