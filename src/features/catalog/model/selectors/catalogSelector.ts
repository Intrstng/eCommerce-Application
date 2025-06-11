import type { AppRootState } from 'app/store';
import type { CatalogProduct } from '../../api/catalogApi.interfaces';

export const catalogProductsSelector = (state: AppRootState): CatalogProduct[] => state.catalog.products;
export const catalogProductSelector = (state: AppRootState): CatalogProduct[] => state.catalog.product;
export const catalogTotalCountSelector = (state: AppRootState): number => state.catalog.totalCount;
