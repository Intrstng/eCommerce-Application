import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { apiRoot } from '../../api/commercetools';
import { projectKey } from '../../api/commercetools-config';
import { authTokenService } from '../../services/auth-token.service';

export const CatalogPage = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();

    const currentPage = searchParameters.get('page');
    const currentType = searchParameters.get('type');

    const handleEarringsClick = () => {
        setSearchParameters(previousParameters => {
            const newParameters = new URLSearchParams(previousParameters);
            newParameters.set('page', '1');
            newParameters.set('type', 'Earrings');
            return newParameters;
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await authTokenService.getAnonymousToken();

                const response = await apiRoot
                    .withProjectKey({ projectKey })
                    .products()
                    .get({
                        queryArgs: {
                            // limit: 6,
                            staged: false,
                        },
                    })
                    .execute();
                const products = response.body.results.map(product => {
                    const masterVariant = product.masterData.current.masterVariant;
                    const description = {
                        ru: product.masterData.current.description
                            ? product.masterData.current.description['ru']
                            : 'No description available',
                        en: product.masterData.current.description
                            ? product.masterData.current.description['en']
                            : 'No description available',
                    };

                    const name = {
                        ru: product.masterData.current.name['ru'] || 'Unnamed product',
                        en: product.masterData.current.name['en'] || 'Unnamed product',
                    };

                    const prices =
                        masterVariant.prices?.map(price => ({
                            id: price.id,
                            value: {
                                type: price.value.type,
                                currencyCode: price.value.currencyCode,
                                centAmount: price.value.centAmount,
                                fractionDigits: price.value.fractionDigits,
                            },
                            country: price.country,
                            channel: price.channel,
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
                        })) ?? [];

                    const images = masterVariant.images?.map(image => image.url) ?? [];

                    return {
                        id: product.id,
                        name,
                        description,
                        categories: product.masterData.current.categories,
                        type: product.productType,
                        prices,
                        images,
                        variants: [masterVariant, ...product.masterData.current.variants].map(variant => ({
                            id: variant.id,
                            sku: variant.sku,
                            attributes: variant.attributes,
                            availability: variant.availability,
                        })),
                    };
                });
                console.log('All products:', products);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        const fetchCategories = async () => {
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
                }));
                console.log('All categories:', categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        void fetchProducts();
        void fetchCategories();
    }, []);

    const catalogContent =
        currentPage && currentType ? (
            <div>
                <h3>{`The catalog is filtered by type and presents page #${currentPage} of ${currentType} products`}</h3>
                <Button type="button" onClick={handleEarringsClick} variant="outlined">
                    Search Earrings in catalog
                </Button>
            </div>
        ) : (
            <h3>This catalog presents all types of products at the moment</h3>
        );

    return (
        <div>
            <h2>Catalog</h2>
            {catalogContent}
        </div>
    );
};
