import type { Product } from '@commercetools/platform-sdk';
import type { CatalogProduct } from '../api/catalogApi.interfaces';
import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';

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

        const productTypeName = product.productType?.obj?.name;

        return {
            id: product.id,
            isToCartLoading: false,
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
            productType: productTypeName,
            productTypeId: product.productType?.id ?? '',
        };
    });
    return products;
}

export function setProductDataFromProjectionResponse(data: ProductProjectionPagedQueryResponse): CatalogProduct[] {
    const totalCount: number = data.total ?? 0;

    return data.results.map(product => {
        const masterVariant = product.masterVariant;
        const description = {
            ru: product.description?.ru ?? 'No description available',
            en: product.description?.en ?? 'No description available',
        };

        const name = {
            ru: product.name.ru || 'Unnamed product',
            en: product.name.en || 'Unnamed product',
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

        const productTypeName = product.productType?.obj?.name;

        return {
            id: product.id,
            isToCartLoading: false,
            description,
            name,
            prices,
            images,
            variants: [masterVariant, ...(product.variants ?? [])].map(variant => ({
                id: variant.id,
                sku: variant.sku,
                attributes: variant.attributes,
                availability: variant.availability,
            })),
            totalCount,
            productType: productTypeName,
            productTypeId: product.productType?.id ?? '',
        };
    });
}
