import { useEffect } from 'react';
import { Catalog } from '../../../features/catalog/ui/Catalog';
import {
    fetchAllCatalogProductsTC,
    getProductsByCategoryTC,
} from '../../../features/catalog/model/slices/catalogSlice';
import { useAppDispatch } from '../../hooks';
import { useSearchParams } from 'react-router-dom';

export const CatalogPage = () => {
    const dispatch = useAppDispatch();
    // @ts-expect-error: Ignoring unused variable warning for setSearchParameters
    const [searchParameters, setSearchParameters] = useSearchParams();
    const currentPage = searchParameters.get('page');
    const currentType = searchParameters.get('type');

    useEffect(() => {
        if (currentType) {
            dispatch(getProductsByCategoryTC(currentType));
        } else {
            dispatch(fetchAllCatalogProductsTC());
        }
    }, [dispatch, currentPage, currentType]);

    return <Catalog />;
};
