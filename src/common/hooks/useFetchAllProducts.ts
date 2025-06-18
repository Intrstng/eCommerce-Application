import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
import { useLayoutEffect, useState } from 'react';
import { catalogAPI } from '../../features/catalog/api/catalogApi';

export const useFetchAllProducts = () => {
    const [isAllProductsLoading, setIsAllProductsLoading] = useState(false);
    const [allProducts, setAllProducts] = useState<CatalogProduct[]>([]);

    useLayoutEffect(() => {
        const fetchAllData = async () => {
            setIsAllProductsLoading(true);
            try {
                const fetchedProducts: CatalogProduct[] = await catalogAPI.fetchAllProductsForSlider();
                setAllProducts(fetchedProducts);
            } catch (error: unknown) {
                const error_ =
                    error instanceof Error
                        ? new Error(`Failed to fetch all products: ${error.message}`)
                        : new Error('Failed to fetch all products: Unknown error occurred');
                throw error_;
            } finally {
                setIsAllProductsLoading(false);
            }
        };

        void fetchAllData();
    }, []);

    return {
        allProducts,
        isAllProductsLoading,
    };
};
