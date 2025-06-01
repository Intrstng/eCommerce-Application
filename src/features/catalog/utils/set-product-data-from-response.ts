import type { Product } from '@commercetools/platform-sdk';
import type { CatalogProduct } from '../api/catalogApi.interfaces';

export function setProductDataFromResponse(data: Product[]): CatalogProduct[] {
    const products = data.map(product => {
        const masterVariant = product.masterData.current.masterVariant;
        const description = {
            ru: product.masterData.current.description
                ? product.masterData.current.description.ru
                : 'No description available',
            en: product.masterData.current.description
                ? product.masterData.current.description.en
                : 'No description available',
        };

        const name = {
            ru: product.masterData.current.name.ru || 'Unnamed product',
            en: product.masterData.current.name.en || 'Unnamed product',
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
            isInCart: false, // Temporary
            isInFavourites: false, // Temporary
            description,
            name,
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
    return products;
}
