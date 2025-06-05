import { useAppDispatch } from './useAppDispatch';
import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
import { useAppSelector } from './useAppSelector';
import { catalogProductsSelector } from '../../features/catalog/model/selectors/catalogSelector';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    fetchAllCatalogProductsTC,
    getProductsByFilterParametersTC,
} from '../../features/catalog/model/slices/catalogSlice';
import { getAttributeValue } from '../../features/catalog/utils/getAttributeValue';
import type { FilterParameters } from '../types';

export const useFetchProducts = () => {
    const dispatch = useAppDispatch();
    const catalogProducts: CatalogProduct[] = useAppSelector<CatalogProduct[]>(catalogProductsSelector);
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [searchParameters] = useSearchParams(); // const [searchParameters, setSearchParameters] = useSearchParams(); // TODO: do not delete yet
    const currentType = searchParameters.get('type');
    // const currentPage = searchParameters.get('page'); // TODO: will be used with pagination
    const currentMaterial = searchParameters.get('material');
    const currentGender = searchParameters.get('gender');
    const currentSearch = searchParameters.get('search');
    const currentSort = searchParameters.get('sort');

    const filterParameters: FilterParameters = useMemo(
        () => ({
            material: currentMaterial,
            gender: currentGender,
            search: currentSearch,
            sort: currentSort,
            // TODO: add select for category type on catalog controls page and it will also be caught here:
            type: currentType,
            // TODO: add input range for price on catalog controls page and pass here this value:
            // price: searchParameters.get('sort'),
        }),
        [currentMaterial, currentGender, currentSearch, currentSort, currentType] // maybe is better searchParameters
    );

    const { materials, genders } = useMemo(() => {
        const materialsSet = new Set<string>();
        const gendersSet = new Set<string>();

        catalogProducts?.forEach(product => {
            const variant = product.variants[0];
            if (!variant) return;

            const material = getAttributeValue(variant, 'material');
            const gender = getAttributeValue(variant, 'gender');

            if (material) materialsSet.add(material);
            if (gender) gendersSet.add(gender);
        });

        return {
            materials: Array.from(materialsSet).sort(),
            genders: Array.from(gendersSet).sort(),
        };
    }, [catalogProducts]);

    useLayoutEffect(() => {
        const fetchData = () => {
            setIsProductsLoading(true);

            try {
                // const action = currentType ? getProductsByCategoryTC(currentType) : fetchAllCatalogProductsTC(); // TODO: do not delete yet (fix currentType here later)
                const action = currentType
                    ? getProductsByFilterParametersTC(filterParameters)
                    : fetchAllCatalogProductsTC(); // TODO: do not delete yet
                dispatch(action);
            } catch (error) {
                const error_ = error instanceof Error ? error : new Error(String(error));
                setIsProductsLoading(false);
                throw error_;
            } finally {
                setIsProductsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, searchParameters]);

    return {
        catalogProducts,
        isProductsLoading,
        materials,
        genders,
    };
};
