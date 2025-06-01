import { useAppDispatch } from './useAppDispatch';
import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
import { useAppSelector } from './useAppSelector';
import { catalogProductsSelector } from '../../features/catalog/model/selectors/catalogSelector';
import { useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCatalogProductsTC, getProductsByCategoryTC } from '../../features/catalog/model/slices/catalogSlice';

export const useFetchProducts = () => {
    const dispatch = useAppDispatch();
    const catalogProducts: CatalogProduct[] = useAppSelector<CatalogProduct[]>(catalogProductsSelector);
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [searchParameters] = useSearchParams(); // const [searchParameters, setSearchParameters] = useSearchParams();
    const currentPage = searchParameters.get('page');
    const currentType = searchParameters.get('type');

    useLayoutEffect(() => {
        const fetchData = async () => {
            setIsProductsLoading(true);

            try {
                const action = currentType ? getProductsByCategoryTC(currentType) : fetchAllCatalogProductsTC();
                // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                await Promise.resolve(dispatch(action));
            } catch (error) {
                const error_ = error instanceof Error ? error : new Error(String(error));
                setIsProductsLoading(false);
                throw error_;
            } finally {
                setIsProductsLoading(false);
            }
        };

        void fetchData();
    }, [dispatch, currentType, currentPage]);

    return {
        catalogProducts,
        isProductsLoading,
    };
};
