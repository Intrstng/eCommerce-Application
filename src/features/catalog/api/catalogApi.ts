import { apiRoot } from '../../../common/api/commercetools';
import { projectKey } from '../../../common/api/commercetools-config';
import type {
    CatalogCategory,
    CatalogProduct,
    Description,
    Name,
    ProductPrice,
    Variant,
} from './catalogApi.interfaces';
import type { Category, ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { setProductDataFromResponse } from '../utils/set-product-data-from-response';
import type { FilterParameters } from '../../../common/types';

// const LIMIT_DEFAULT = 5;
// const OFFSET_DEFAULT = 0;

export const catalogAPI = {
    async fetchProducts(): Promise<CatalogProduct[]> {
        try {
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

    // async getProductsBySelect(filterParameters: FilterParameters): Promise<ProductProjectionPagedSearchResponse> { TODO: do not delete yet

    async getProductsBySelect(filterParameters: FilterParameters): Promise<CatalogProduct[]> {
        try {
            const categories = await this.getCategories();
            let category: Category | undefined;
            if (filterParameters?.type) {
                category = categories.find(cat => cat.key?.toLowerCase() === filterParameters.type?.toLowerCase());
            }

            if (!category) {
                throw new Error(`Category not found`);
            }

            console.log(filterParameters);

            const queryArguments: {
                fuzzy: boolean;
                limit: number;
                offset: number;
                filter?: string[];
                'filter.facets'?: string[];
                sort?: string | string[];
                'text.en'?: string;
                'text.${locale}'?: string;
                priceCurrency?: string;
                priceCountry?: string;
                expand?: string[];
            } = {
                fuzzy: true,
                limit: 10,
                offset: 0,
            };

            if (category) {
                queryArguments.filter = [`categories.id:"${category.id}"`];
            }

            //Add sorting (default or from parameters)
            queryArguments.sort = filterParameters?.sort
                ? parseSortParameter(filterParameters.sort)
                : ['price asc', 'name.en desc']; // Default sort

            // Add search text if provided
            if (filterParameters?.search) {
                queryArguments['text.en'] = filterParameters.search;
            }

            // Add material filter if provided
            if (filterParameters?.material) {
                queryArguments.filter = [
                    ...(queryArguments.filter ?? []),
                    `variants.attributes.material:"${filterParameters.material}"`,
                ];
            }

            // Add gender filter if provided
            if (filterParameters?.gender) {
                queryArguments.filter = [
                    ...(queryArguments.filter ?? []),
                    `variants.attributes.gender:"${filterParameters.gender}"`,
                ];
            }

            const response = await apiRoot
                .withProjectKey({ projectKey })
                .productProjections()
                .search()
                .get({ queryArgs: queryArguments })
                .execute();

            console.log(response.body.results);

            return transformResponse(response.body.results);

            // DRAFT
            // const selectorTypes: CatalogProductSelect = {
            //     // sort: string;
            //     filter: ['rings'],
            //     query: '',
            //     limit: 10,
            //     offset: 0,
            //     sort: 'name.en asc'
            // }
            // const response2 = await catalogAPI.getProductsBySelect(selectorTypes);

            // const categoryType = [`categories.id:${category.id}`] // or ['rings']
            //    const sort = [
            //        'price asc',
            //        'name.en desc',
            //    ] // or just 'name.en desc'
            //    const query2 = 'brass'
            //             const limit = 10
            //             const offset = 0
            //
            //             const response =  await apiRoot
            //                 .withProjectKey({ projectKey })
            //                 .productProjections()
            //                 .search()
            //                 .get({
            //                     queryArgs: {
            //                         fuzzy: true,
            //                         offset,
            //                         limit,
            //                         categoryType,
            //                         sort,
            //                         'text.en': query2,
            //                     },
            //                 })
            //                 .execute();
            //
            // console.log('getProductsBySelect', response)
            // return setProductDataFromResponse(response.body.results);
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? `Failed to fetch products: ${error.message}`
                    : 'Failed to fetch products: Unknown error occurred';
            throw new Error(errorMessage);
        }
    },
};

export function parseSortParameter(sort: string | null): string[] {
    if (!sort) {
        return ['price asc', 'name.en desc']; // Default sort
    }

    switch (sort) {
        case 'price_asc': {
            return ['price asc'];
        }
        case 'price_desc': {
            return ['price desc'];
        }
        case 'name_asc': {
            return ['name.en asc'];
        }
        case 'name_desc': {
            return ['name.en desc'];
        }
        // case 'newest':
        //     return ['createdAt desc'];
        // case 'bestselling':
        //     return ['variants.attributes.popularity desc'];
        default: {
            return ['price asc', 'name.en desc'];
        }
    }
}

// TODO: OR use this parseSortParameter function
// type ValidSortOption =
//     'price_asc' | 'price_desc' |
//     'name_asc' | 'name_desc' |
//     'newest' | 'bestselling';
//
// export function parseSortParameter(sort: string | null): string[] {
//     const validSorts: Record<ValidSortOption, string[]> = {
//         'price_asc': ['price asc'],
//         'price_desc': ['price desc'],
//         'name_asc': ['name.en asc'],
//         'name_desc': ['name.en desc'],
//         'newest': ['createdAt desc'],
//         'bestselling': ['variants.attributes.salesRank desc']
//     };
//
//     return sort && validSorts[sort as ValidSortOption]
//         ? validSorts[sort as ValidSortOption]
//         : ['price asc', 'name.en desc'];
// }

function transformResponse(products: ProductProjection[]): CatalogProduct[] {
    return products.map(product => {
        // Extract all prices (masterVariant + variants)
        const allPrices = [
            ...extractPrices(product.masterVariant),
            ...product.variants.flatMap(variant => extractPrices(variant)),
        ];

        // Extract all images (masterVariant + variants)
        const allImages = [
            ...extractImages(product.masterVariant),
            ...product.variants.flatMap(variant => extractImages(variant)),
        ];

        return {
            id: product.id,
            name: transformName(product.name),
            description: transformDescription(product.description),
            prices: allPrices,
            images: allImages,
            variants: [
                transformVariant(product.masterVariant),
                ...product.variants.map(variant => transformVariant(variant)),
            ],
            isInCart: false, // TODO: Will be set by your application state
            isInFavourites: false, // TODO: Will be set by your application state
        };
    });
}

// Helper methods
function transformName(name?: Record<string, string>): Name {
    return {
        ru: name?.ru && '',
        en: name?.en && '',
    };
}

function transformDescription(description?: Record<string, string>): Description {
    return {
        ru: description?.ru && '',
        en: description?.en && '',
    };
}

function extractPrices(variant: ProductVariant): ProductPrice[] {
    return (
        variant.prices?.map(price => ({
            id: price.id && '',
            value: {
                type: price.value.type,
                currencyCode: price.value.currencyCode,
                centAmount: price.value.centAmount,
                fractionDigits: price.value.fractionDigits,
            },
            ...(price.country && { country: price.country }),
            discounted: price.discounted
                ? {
                      value: {
                          type: price.discounted.value.type,
                          currencyCode: price.discounted.value.currencyCode,
                          centAmount: price.discounted.value.centAmount,
                          fractionDigits: price.discounted.value.fractionDigits,
                      },
                  }
                : null,
        })) ?? []
    );
}

function extractImages(variant: ProductVariant): string[] {
    return variant.images?.map(image => image.url) ?? [];
}

function transformVariant(variant: ProductVariant): Variant {
    return {
        id: variant.id,
        ...(variant.sku && { sku: variant.sku }),
        ...(variant.attributes && { attributes: variant.attributes }),
        ...(variant.availability && { availability: variant.availability }),
    };
}
