import { apiRoot } from '../../../common/api/commercetools';
import { projectKey } from '../../../common/api/commercetools-config';
import type { CatalogCategory, CatalogProduct } from './catalogApi.interfaces';
import type { Category } from '@commercetools/platform-sdk';
import { setProductDataFromResponse } from '../utils/set-product-data-from-response';
import { authTokenService } from '../../../common/services/auth-token.service';

export const catalogAPI = {
    async fetchProducts(): Promise<CatalogProduct[]> {
        try {
            await authTokenService.getAnonymousToken();

            const response = await apiRoot
                .withProjectKey({ projectKey })
                .products()
                .get({
                    queryArgs: {
                        // limit: 7,
                        // offset: 0,
                        staged: false,
                    },
                })
                .execute();
            // await this.fetchCategories()
            console.log(response.body.results);

            return setProductDataFromResponse(response.body.results);
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
            await authTokenService.getAnonymousToken();

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
            await authTokenService.getAnonymousToken();

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

            console.log('All categories:', categories);
            return categories;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch categories: ${error.message}`)
                    : new Error('Failed to fetch categories: Unknown error occurred');
            throw error_;
        }
    },
};
