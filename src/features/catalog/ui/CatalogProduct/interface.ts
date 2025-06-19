import type { CatalogProduct } from '../../api/catalogApi.interfaces';

export interface ProductsGridProps {
    products: CatalogProduct[];
    isProductsLoading: boolean;
}
