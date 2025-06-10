import { apiRoot } from '../../../common/api/commercetools';
import { projectKey } from '../../../common/api/commercetools-config';
import type { CatalogCategory, CatalogProduct } from './catalogApi.interfaces';
import type { Category, QueryParam } from '@commercetools/platform-sdk';
import { setProductDataFromResponse } from '../utils/set-product-data-from-response';
import { setProductDataFromProjectionResponse } from '../utils/set-product-data-from-response';

export interface ProductType {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    lastModifiedAt: string;
    version: number;
}

interface ProductsQueryArguments {
    [key: string]: QueryParam | string | string[] | undefined;
    staged?: boolean;
    // where?: string | string[];
}

export const catalogAPI = {
    async fetchProducts(
        searchParameters?: {
            material?: string;
            gender?: string;
            search?: string;
            productType?: string;
        },
        allProductTypes?: ProductType[],
        categoryType?: string
    ): Promise<CatalogProduct[]> {
        try {
            let categoryId = '';

            if (categoryType) {
                const categories = await this.getCategories();
                const category = categories.find(cat => cat.key?.toLowerCase() === categoryType.toLowerCase());

                if (category) {
                    categoryId = category.id;
                }
            }

            const queryArguments: ProductsQueryArguments = {
                staged: false,
            };

            if (searchParameters?.search?.trim()) {
                queryArguments['text.en'] = searchParameters.search.trim();
            }

            const filters = [];
            if (searchParameters?.material?.trim()) {
                filters.push(`variants.attributes.material.key:"${searchParameters.material.trim()}"`);
            }
            if (searchParameters?.gender?.trim()) {
                filters.push(`variants.attributes.gender.key:"${searchParameters.gender.trim()}"`);
            }

            const productTypeName = searchParameters?.productType?.trim();
            if (productTypeName && allProductTypes) {
                const selectedType = allProductTypes.find(type => type.name === productTypeName);
                if (selectedType) {
                    filters.push(`productType.id:"${selectedType.id}"`);
                }
            }

            if (categoryId.length > 0) {
                filters.push(`categories.id: subtree("${categoryId.trim()}")`);
            }

            if (filters.length > 0) {
                queryArguments['filter.query'] = filters;
            }

            const response = await apiRoot
                .withProjectKey({ projectKey })
                .productProjections()
                .search()
                .get({
                    queryArgs: queryArguments,
                    // limit: 6,
                    // offset: 0,
                })
                .execute();
            // console.log(response.body.results);

            return setProductDataFromProjectionResponse(response.body.results);
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch products: ${error.message}`)
                    : new Error('Failed to fetch products: Unknown error occurred');
            throw error_;
        }
    },

    async getCategories(): Promise<Category[]> {
        const response = await apiRoot.withProjectKey({ projectKey }).categories().get().execute();
        return response.body.results;
    },

    async getProductsByCategory(categoryType: string): Promise<CatalogProduct[]> {
        try {
            const categories = await this.getCategories();
            const category = categories.find(cat => cat.key?.toLowerCase() === categoryType.toLowerCase());

            if (!category) {
                throw new Error(`Category ${categoryType} not found`);
            }

            const response = await apiRoot
                .withProjectKey({ projectKey })
                .products()
                .get({
                    queryArgs: {
                        where: `masterData(current(categories(id="${category.id}")))`,
                    },
                })
                .execute();

            return setProductDataFromResponse(response.body.results);
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch products: ${error.message}`)
                    : new Error('Failed to fetch products: Unknown error occurred');
            throw error_;
        }
    },

    async getProductByID(id: string): Promise<CatalogProduct[]> {
        try {
            const response = await apiRoot
                .withProjectKey({ projectKey })
                .products()
                .get({
                    queryArgs: {
                        where: `id="${id}"`,
                    },
                })
                .execute();

            return setProductDataFromResponse(response.body.results);
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch product by ID: ${error.message}`)
                    : new Error('Failed to fetch product by ID: Unknown error occurred');
            throw error_;
        }
    },

    // ToDo: Check will we use fetchCategories function in the future:
    async fetchCategories(): Promise<CatalogCategory[]> {
        try {
            const response = await apiRoot.withProjectKey({ projectKey }).categories().get().execute();
            const productsResponse = await apiRoot
                .withProjectKey({ projectKey })
                .products()
                .get({
                    queryArgs: {
                        staged: false,
                    },
                })
                .execute();

            const categoryProductCount = new Map<string, number>();
            productsResponse.body.results.forEach(product => {
                product.masterData.current.categories.forEach(category => {
                    const count = categoryProductCount.get(category.id) ?? 0;
                    categoryProductCount.set(category.id, count + 1);
                });
            });

            const categories = response.body.results.map(category => ({
                externalId: category.externalId,
                id: category.id,
                key: category.key,
                name: category.name,
                orderHint: category.orderHint,
                slug: category.slug,
                productCount: categoryProductCount.get(category.id) ?? 0,
                description: category.description,
            }));

            // console.log('All categories:', categories);
            return categories;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch categories: ${error.message}`)
                    : new Error('Failed to fetch categories: Unknown error occurred');
            throw error_;
        }
    },

    async fetchProductTypes(): Promise<ProductType[]> {
        try {
            const response = await apiRoot.withProjectKey({ projectKey }).productTypes().get().execute();
            // console.log('All product types:', response.body.results);
            return response.body.results;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch product types: ${error.message}`)
                    : new Error('Failed to fetch product types: Unknown error occurred');
            throw error_;
        }
    },
};
