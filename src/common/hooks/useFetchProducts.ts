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
import { getAttributeValue } from '../../features/catalog/utils/getAttributeValue';
import type { ProductType, SearchParameters } from '../../features/catalog/api/interfaces';

export const useFetchProducts = () => {
    const dispatch = useAppDispatch();
    const catalogProducts = useAppSelector(catalogProductsSelector);
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [searchParameters] = useSearchParams();
    const [allProductsForFilters, setAllProductsForFilters] = useState<CatalogProduct[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const allCatalogProducts = useMemo(() => catalogProducts ?? [], [catalogProducts]);

    useLayoutEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const [productsResponse, productTypesResponse] = await Promise.all([
                    apiRoot
                        .withProjectKey({ projectKey })
                        .products()
                        .get({ queryArgs: { staged: false, limit: 100 } })
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
    }, [dispatch, allProductsForFilters.length, searchParameters]); // check searchParameters probably to delete

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
    }, [allProductsForFilters, searchParameters]); // check searchParameters probably to delete

    const filters = useMemo(
        () => ({
            material: searchParameters.get('material'),
            gender: searchParameters.get('gender'),
            search: searchParameters.get('search'),
            sort: searchParameters.get('sort'),
        }),
        [searchParameters]
    );

    const sortParameter = searchParameters.get('sort');
    const catalogProductsFiltered = useMemo(() => {
        const filteredProducts = [...allCatalogProducts];

        if (sortParameter) {
            filteredProducts.sort((a, b) => {
                const currentCurrencyA = a.prices.find(price => price.value.currencyCode === 'EUR');
                const currentCurrencyB = b.prices.find(price => price.value.currencyCode === 'EUR');

                let priceA = 0;
                let priceB = 0;

                if (currentCurrencyA) {
                    priceA = currentCurrencyA.discounted?.value.centAmount ?? currentCurrencyA.value.centAmount;
                }

                if (currentCurrencyB) {
                    priceB = currentCurrencyB.discounted?.value.centAmount ?? currentCurrencyB.value.centAmount;
                }

                switch (sortParameter) {
                    case 'price_asc': {
                        return priceA - priceB;
                    }
                    case 'price_desc': {
                        return priceB - priceA;
                    }
                    case 'name:A-Z': {
                        return a.name.en.localeCompare(b.name.en);
                    }
                    case 'name:Z-A': {
                        return b.name.en.localeCompare(a.name.en);
                    }
                    default: {
                        return 0;
                    }
                }
            });
        }

        return filteredProducts;
    }, [allCatalogProducts, filters.sort]);

    useLayoutEffect(() => {
        const fetchData = () => {
            setIsProductsLoading(true);
            try {
                const currentProductType: string | null = searchParameters.get('type');
                const productTypeParameter: string | null = searchParameters.get('productType');

                const searchParameters_: SearchParameters = {
                    material: searchParameters.get('material') ?? undefined,
                    gender: searchParameters.get('gender') ?? undefined,
                    search: searchParameters.get('search') ?? undefined,
                    currentPage: searchParameters.get('page') ?? '1',
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
        catalogProductsFiltered,
        isProductsLoading,
        materials,
        genders,
        productTypes,
    };
};
