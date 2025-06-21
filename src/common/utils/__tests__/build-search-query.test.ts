import { describe, it, expect } from 'vitest';
import { SearchPaginationParameters } from '../../../features/catalog/api/interfaces';
import { buildSearchQuery } from '../build-search-query';

const MATERIAL: string = 'gold';
const GENDER: string = 'unisex';
const SEARCH: string = 'quartz';
const TYPE: string = 'rings';
const PRODUCT_TYPE: string = 'earrings';
const CURRENT_PAGE: string = '5';

describe('Test buildSearchQuery function', () => {
    it('should build query string with all parameters', () => {
        const params: SearchPaginationParameters = {
            material: MATERIAL,
            gender: GENDER,
            search: SEARCH,
            type: TYPE,
            productType: PRODUCT_TYPE,
            currentPage: CURRENT_PAGE,
        };

        const query = buildSearchQuery(params);
        expect(query).toBe(
            `material=${MATERIAL}&gender=${GENDER}&search=${SEARCH}&type=${TYPE}&productType=${PRODUCT_TYPE}&page=${CURRENT_PAGE}`
        );
    });

    it('should build query string with some parameters', () => {
        const params: SearchPaginationParameters = {
            material: MATERIAL,
            gender: GENDER,
            search: '',
            type: undefined,
            productType: PRODUCT_TYPE,
            currentPage: CURRENT_PAGE,
        };

        const query = buildSearchQuery(params);
        expect(query).toBe(`material=${MATERIAL}&gender=${GENDER}&productType=${PRODUCT_TYPE}&page=${CURRENT_PAGE}`);
    });

    it('should return an empty string if no parameters are provided', () => {
        const params: SearchPaginationParameters = {};

        const query = buildSearchQuery(params);
        expect(query).toBe('');
    });

    it('should ignore undefined and empty string parameters', () => {
        const params: SearchPaginationParameters = {
            material: undefined,
            gender: '',
            search: undefined,
            type: TYPE,
            productType: PRODUCT_TYPE,
            currentPage: CURRENT_PAGE,
        };

        const query = buildSearchQuery(params);
        expect(query).toBe(`type=${TYPE}&productType=${PRODUCT_TYPE}&page=${CURRENT_PAGE}`);
    });
});
