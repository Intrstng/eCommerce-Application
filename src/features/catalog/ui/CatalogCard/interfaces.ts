import type { ProductPrice } from '../../api/catalogApi.interfaces';

export interface CatalogItemProps {
    id: string;
    image: string;
    title: string;
    prices: ProductPrice[];
    description: string;
    isProductsLoading: boolean;
    isToCartLoading: boolean;
    variantId: number;
}
