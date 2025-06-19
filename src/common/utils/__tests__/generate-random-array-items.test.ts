import { describe, it, expect } from 'vitest';
import { generateRandomArrayItems } from '../generate-random-array-items';

const ITEMS_COLLECTION: number[] = [1, 2, 3, 4, 5];

describe('Test generateRandomArrayItems function', () => {
    it('should return an empty array if count is 0', () => {
        const result = generateRandomArrayItems(ITEMS_COLLECTION, 0);
        expect(result).toEqual([]);
    });

    it('should return the original array if count is greater than or equal to the array length', () => {
        const GREATER_ITEMS_COLLECTION_LENGTH = ITEMS_COLLECTION.length + 1;

        const result = generateRandomArrayItems(ITEMS_COLLECTION, GREATER_ITEMS_COLLECTION_LENGTH);
        expect(result).toEqual(ITEMS_COLLECTION);
    });

    it('should return a random subset of the array when count is less than the array length', () => {
        const LESS_ITEMS_COLLECTION_LENGTH = ITEMS_COLLECTION.length - 1;

        const result = generateRandomArrayItems(ITEMS_COLLECTION, LESS_ITEMS_COLLECTION_LENGTH);
        expect(result.length).toBe(LESS_ITEMS_COLLECTION_LENGTH);
        expect(ITEMS_COLLECTION).toContain(result[0]);
        expect(ITEMS_COLLECTION).toContain(result[1]);
        expect(ITEMS_COLLECTION).toContain(result[2]);
    });

    it('should handle arrays with one item correctly', () => {
        const result = generateRandomArrayItems([25], 1);
        expect(result).toEqual([25]);
    });

    it('should return an empty array if the input array is empty', () => {
        const result = generateRandomArrayItems([], 2);
        expect(result).toEqual([]);
    });

    it('should not modify the original array', () => {
        const originalItems = [...ITEMS_COLLECTION];
        generateRandomArrayItems(ITEMS_COLLECTION, 2);
        expect(ITEMS_COLLECTION).toEqual(originalItems);
    });
});
