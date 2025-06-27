import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
import { useLayoutEffect, useState } from 'react';
import { catalogAPI } from '../../features/catalog/api/catalogApi';
import { useAppSelector } from './useAppSelector';
import { isLoggingOutSelector } from 'app/model/selectors/appSelectors';

export const useFetchAllProducts = () => {
    const [isAllProductsLoading, setIsAllProductsLoading] = useState(false);
    const [allProducts, setAllProducts] = useState<CatalogProduct[]>([]);
    const isLoggingOut = useAppSelector<boolean>(isLoggingOutSelector);

    useLayoutEffect(() => {
        if (isLoggingOut) return;

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
    }, [isLoggingOut]);

    return {
        allProducts,
        isAllProductsLoading,
    };
};
