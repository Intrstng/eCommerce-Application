import { useAppDispatch } from './useAppDispatch';
import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
import { useAppSelector } from './useAppSelector';
import { catalogProductsSelector } from '../../features/catalog/model/selectors/catalogSelector';
import { useLayoutEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCatalogProductsTC, getProductsByCategoryTC } from '../../features/catalog/model/slices/catalogSlice';
import type { Attribute } from '@commercetools/platform-sdk';
import { isLocalizedString, isPlainEnumValue, isLocalizedEnumValue } from '../utils/type-guards';

const getAttributeValue = (variant: CatalogProduct['variants'][0], attributeName: string): string | undefined => {
    const attribute = variant.attributes?.find(
        (attribute_): attribute_ is Attribute & { name: string } => attribute_.name === attributeName
    );

    if (!attribute || attribute.value === null || attribute.value === undefined) {
        return undefined;
    }

    const value: unknown = attribute.value;
    if (typeof value === 'string') {
        return value;
    }

    if (isLocalizedString(value)) {
        return value.en;
    }

    if (isPlainEnumValue(value)) {
        return value.key;
    }

    if (isLocalizedEnumValue(value)) {
        return value.label.en;
    }

    return String(value);
};

export const useFetchProducts = () => {
    const dispatch = useAppDispatch();
    const catalogProducts = useAppSelector(catalogProductsSelector);
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [searchParameters] = useSearchParams();

    const currentType = searchParameters.get('type');
    const currentPage = searchParameters.get('page');

    const allCatalogProducts = useMemo(() => catalogProducts ?? [], [catalogProducts]);

    const filters = useMemo(
        () => ({
            material: searchParameters.get('material'),
            gender: searchParameters.get('gender'),
            search: searchParameters.get('search'),
            sort: searchParameters.get('sort'),
        }),
        [searchParameters]
    );

    const { materials, genders } = useMemo(() => {
        const materialsSet = new Set<string>();
        const gendersSet = new Set<string>();

        allCatalogProducts.forEach(product => {
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
    }, [allCatalogProducts]);

    const catalogProductsFiltered = useMemo(() => {
        const filtered = allCatalogProducts.filter(product => {
            const matchesMaterial =
                !filters.material || product.variants.some(v => getAttributeValue(v, 'material') === filters.material);

            const matchesGender =
                !filters.gender || product.variants.some(v => getAttributeValue(v, 'gender') === filters.gender);

            const matchesSearch =
                !filters.search ||
                product.name.en.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.description?.en?.toLowerCase().includes(filters.search.toLowerCase());

            return matchesMaterial && matchesGender && matchesSearch;
        });

        filtered.sort((a, b) => {
            if (!filters.sort) return 0;

            const priceA = a.prices?.[0]?.value.centAmount ?? 0;
            const priceB = b.prices?.[0]?.value.centAmount ?? 0;

            switch (filters.sort) {
                case 'price_asc': {
                    return priceA - priceB;
                }
                case 'price_desc': {
                    return priceB - priceA;
                }
                default: {
                    return 0;
                }
            }
        });

        return filtered;
    }, [allCatalogProducts, filters.material, filters.gender, filters.search, filters.sort]);

    useLayoutEffect(() => {
        const fetchData = () => {
            setIsProductsLoading(true);
            try {
                const action = currentType ? getProductsByCategoryTC(currentType) : fetchAllCatalogProductsTC();
                dispatch(action);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsProductsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, currentType, currentPage]);

    return {
        catalogProductsFiltered,
        isProductsLoading,
        materials,
        genders,
    };
};
