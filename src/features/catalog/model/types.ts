import type { CatalogProduct } from '../api/catalogApi.interfaces';

export type CatalogState = {
    products: CatalogProduct[];
    product: CatalogProduct[];
    totalCount: number;
};
