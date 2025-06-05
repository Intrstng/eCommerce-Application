import { useAppDispatch } from './useAppDispatch';
import type { CatalogProduct } from '../../features/catalog/api/catalogApi.interfaces';
import { useAppSelector } from './useAppSelector';
import { catalogProductsSelector } from '../../features/catalog/model/selectors/catalogSelector';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCatalogProductsTC } from '../../features/catalog/model/slices/catalogSlice';
import { apiRoot } from 'src/common/api/commercetools.ts';
import { projectKey } from 'src/common/api/commercetools-config.ts';
import { setProductDataFromResponse } from '../../features/catalog/utils/set-product-data-from-response';
import type { ProductType } from '../../features/catalog/api/catalogApi';
import { getAttributeValue } from '../../features/catalog/utils/getAttributeValue';

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

        return {
            materials: Array.from(materialsSet).sort(),
            genders: Array.from(gendersSet).sort(),
        };
    }, [allProductsForFilters, searchParameters]); // added searchParameters because: allProductsForFilters is object; materials and genders were not updated on allProductsForFilters change - у нас materials, genders обновляется только раз и касательно для всех товаров. Но есть же еще отдельные переходы между страницами с категориями где materials, genders могут отличаться

    useLayoutEffect(() => {
        const fetchData = () => {
            setIsProductsLoading(true);
            try {
                const currentProductType: string | null = searchParameters.get('type');
                const productTypeParameter = searchParameters.get('productType');

                const searchParameters_ = {
                    material: searchParameters.get('material') ?? undefined,
                    gender: searchParameters.get('gender') ?? undefined,
                    search: searchParameters.get('search') ?? undefined,
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    productType: productTypeParameter === null ? undefined : productTypeParameter,
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
    }, [dispatch, searchParameters, productTypes]);

    return {
        catalogProductsFiltered: allCatalogProducts,
        isProductsLoading,
        materials,
        genders,
        productTypes,
    };
};
