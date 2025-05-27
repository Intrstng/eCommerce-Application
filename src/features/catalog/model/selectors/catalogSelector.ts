import type { AppRootState } from 'app/store';
import type { CatalogProduct } from '../../api/catalogApi.interfaces';

export const catalogProductsSelector = (state: AppRootState): CatalogProduct[] => state.catalog.products;
