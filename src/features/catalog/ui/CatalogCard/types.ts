import type { ProductPrice } from '../../api/catalogApi.interfaces';

export type CatalogItemProps = {
    id: string;
    image: string;
    title: string;
    prices: ProductPrice[];
    description: string;
    isProductsLoading: boolean;
    variantId: number;
};

export type Currency = 'BYN' | 'EUR' | 'RUB';
