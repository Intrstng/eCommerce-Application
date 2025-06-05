// import { useAppDispatch } from './useAppDispatch';
// import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
// import { useAppSelector } from './useAppSelector';
// import { catalogProductsSelector } from '../../features/catalog/model/selectors/catalogSelector';
// import { useLayoutEffect, useMemo, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import {
//     fetchAllCatalogProductsTC,
//     getProductsByFilterParametersTC,
// } from '../../features/catalog/model/slices/catalogSlice';
// import { getAttributeValue } from '../../features/catalog/utils/getAttributeValue';
// import type { FilterParameters } from '../types';
//
// export const useFetchProducts = () => {
//     const dispatch = useAppDispatch();
//     const catalogProducts: CatalogProduct[] = useAppSelector<CatalogProduct[]>(catalogProductsSelector);
//     const [isProductsLoading, setIsProductsLoading] = useState(false);
//     const [searchParameters] = useSearchParams(); // const [searchParameters, setSearchParameters] = useSearchParams(); // TODO: do not delete yet
//     const currentType = searchParameters.get('type');
//     // const currentPage = searchParameters.get('page'); // TODO: will be used with pagination
//     const currentMaterial = searchParameters.get('material');
//     const currentGender = searchParameters.get('gender');
//     const currentSearch = searchParameters.get('search');
//     const currentSort = searchParameters.get('sort');
//
//     const filterParameters: FilterParameters = useMemo(
//         () => ({
//             material: currentMaterial,
//             gender: currentGender,
//             search: currentSearch,
//             sort: currentSort,
//             // TODO: add select for category type on catalog controls page and it will also be caught here:
//             type: currentType,
//             // TODO: add input range for price on catalog controls page and pass here this value:
//             // price: searchParameters.get('sort'),
//         }),
//         [currentMaterial, currentGender, currentSearch, currentSort, currentType] // maybe is better searchParameters
//     );
//
//     const { materials, genders } = useMemo(() => {
//         const materialsSet = new Set<string>();
//         const gendersSet = new Set<string>();
//
//         catalogProducts?.forEach(product => {
//             const variant = product.variants[0];
//             if (!variant) return;
//
//             const material = getAttributeValue(variant, 'material');
//             const gender = getAttributeValue(variant, 'gender');
//
//             if (material) materialsSet.add(material);
//             if (gender) gendersSet.add(gender);
//         });
//
//         return {
//             materials: Array.from(materialsSet).sort(),
//             genders: Array.from(gendersSet).sort(),
//         };
//     }, [catalogProducts]);
//
//     useLayoutEffect(() => {
//         const fetchData = () => {
//             setIsProductsLoading(true);
//
//             try {
//                 // const action = currentType ? getProductsByCategoryTC(currentType) : fetchAllCatalogProductsTC(); // TODO: do not delete yet (fix currentType here later)
//                 const action = currentType
//                     ? getProductsByFilterParametersTC(filterParameters)
//                     : fetchAllCatalogProductsTC(); // TODO: do not delete yet
//                 dispatch(action);
//             } catch (error) {
//                 const error_ = error instanceof Error ? error : new Error(String(error));
//                 setIsProductsLoading(false);
//                 throw error_;
//             } finally {
//                 setIsProductsLoading(false);
//             }
//         };
//
//         fetchData();
//     }, [dispatch, searchParameters]);
//
//     return {
//         catalogProducts,
//         isProductsLoading,
//         materials,
//         genders,
//     };
// };

import { useAppDispatch } from './useAppDispatch';
import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
import { useAppSelector } from './useAppSelector';
import { catalogProductsSelector } from '../../features/catalog/model/selectors/catalogSelector';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCatalogProductsTC } from '../../features/catalog/model/slices/catalogSlice';
import type { Attribute } from '@commercetools/platform-sdk';
import { isLocalizedEnumValue, isLocalizedString, isPlainEnumValue } from '../utils/type-guards';
import { apiRoot } from 'src/common/api/commercetools.ts';
import { projectKey } from 'src/common/api/commercetools-config.ts';
import { setProductDataFromResponse } from '../../features/catalog/utils/set-product-data-from-response';
import type { ProductType } from '../../features/catalog/api/catalogApi';

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
    } else if (isLocalizedString(value)) {
        return value.en;
    } else if (isPlainEnumValue(value)) {
        return value.key;
    } else if (isLocalizedEnumValue(value)) {
        return value.label.en;
    }
    return String(value);
};

export const useFetchProducts = () => {
    const dispatch = useAppDispatch();
    const catalogProducts = useAppSelector(catalogProductsSelector);
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [searchParameters] = useSearchParams();
    const [allProductsForFilters, setAllProductsForFilters] = useState<CatalogProduct[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    // const currentType = searchParameters.get('type');
    // const currentPage = searchParameters.get('page');

    const allCatalogProducts = useMemo(() => catalogProducts ?? [], [catalogProducts]);

    useLayoutEffect(() => {
        const fetchAllProducts = async () => {
            console.log('LayoutEffect 1');
            try {
                const [productsResponse, productTypesResponse] = await Promise.all([
                    apiRoot
                        .withProjectKey({ projectKey })
                        .products()
                        .get({ queryArgs: { staged: false } })
                        .execute(),
                    apiRoot.withProjectKey({ projectKey }).productTypes().get().execute(),
                ]);

                setAllProductsForFilters(setProductDataFromResponse(productsResponse.body.results));
                setProductTypes(productTypesResponse.body.results);
            } catch (error) {
                console.error('Error fetching all products for filters:', error);
            }
        };

        if (allProductsForFilters.length === 0) {
            void fetchAllProducts();
        }
    }, [dispatch, allProductsForFilters.length, searchParameters]); // searchParameters probably to delete

    const { materials, genders } = useMemo(() => {
        const materialsSet = new Set<string>();
        const gendersSet = new Set<string>();

        allProductsForFilters.forEach(product => {
            const variant = product.variants[0];
            if (!variant) return;

            const material = getAttributeValue(variant, 'material');
            const gender = getAttributeValue(variant, 'gender');

            if (material) materialsSet.add(material);
            if (gender) gendersSet.add(gender);
        });

        console.log({
            materials: Array.from(materialsSet).sort(),
            genders: Array.from(gendersSet).sort(),
        });
        return {
            materials: Array.from(materialsSet).sort(),
            genders: Array.from(gendersSet).sort(),
        };
    }, [allProductsForFilters, searchParameters]); // added searchParameters because: allProductsForFilters is object; materials and genders were not updated on allProductsForFilters change - у нас materials, genders обновляется только раз и касательно для всех товаров. Но есть же еще отдельные переходы между страницами с категориями где materials, genders могут отличаться

    useLayoutEffect(() => {
        console.log('LayoutEffect 2');
        const fetchData = () => {
            const currentProductType: string | null = searchParameters.get('type');

            setIsProductsLoading(true);
            try {
                const searchParameters_ = {
                    material: searchParameters.get('material') ?? undefined,
                    gender: searchParameters.get('gender') ?? undefined,
                    search: searchParameters.get('search') ?? undefined,
                    productType: searchParameters.get('productType') ?? undefined,
                };

                if (currentProductType) {
                    dispatch(fetchAllCatalogProductsTC(searchParameters_, productTypes, currentProductType));
                } else {
                    dispatch(fetchAllCatalogProductsTC(searchParameters_, productTypes));
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsProductsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, searchParameters]);

    return {
        catalogProductsFiltered: allCatalogProducts,
        isProductsLoading,
        materials,
        genders,
        productTypes,
    };
};
