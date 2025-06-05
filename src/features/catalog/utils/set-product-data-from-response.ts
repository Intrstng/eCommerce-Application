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

    const discountedProducts = products.filter(product => product.prices.some(price => price.discounted !== null));
    discountedProducts.forEach(product => {
        // console.log(`${product.name.ru || product.name.en} ID: ${product.id}`); // TODO: uncomment later

        const rub = product.prices.find(price => price.value.currencyCode === 'RUB');
        const eur = product.prices.find(price => price.value.currencyCode === 'EUR');
        const byn = product.prices.find(price => price.value.currencyCode === 'BYN');

        if (rub?.discounted) {
            // const originalAmount = rub.value.centAmount / Math.pow(10, rub.value.fractionDigits);
            // const discountedAmount = rub.discounted.value.centAmount / Math.pow(10, rub.discounted.value.fractionDigits);
            // const discount = (((originalAmount - discountedAmount) / originalAmount) * 100).toFixed(1);
            // console.log(`RUB: ${originalAmount.toFixed(2)} -> ${discountedAmount.toFixed(2)} (${discount}%)`); // TODO: uncomment later
        } else {
            console.log('RUB: not found');
        }

        if (eur?.discounted) {
            // const originalAmount = eur.value.centAmount / Math.pow(10, eur.value.fractionDigits);
            // const discountedAmount =
            //     eur.discounted.value.centAmount / Math.pow(10, eur.discounted.value.fractionDigits);
            // const discount = (((originalAmount - discountedAmount) / originalAmount) * 100).toFixed(1);
            // console.log(`EUR: ${originalAmount.toFixed(2)} -> ${discountedAmount.toFixed(2)} (${discount}%)`); // TODO: uncomment later
        } else {
            console.log('EUR: not found');
        }

        if (byn?.discounted) {
            // const originalAmount = byn.value.centAmount / Math.pow(10, byn.value.fractionDigits);
            // const discountedAmount =
            //     byn.discounted.value.centAmount / Math.pow(10, byn.discounted.value.fractionDigits);
            // const discount = (((originalAmount - discountedAmount) / originalAmount) * 100).toFixed(1);
            // console.log(`BYN: ${originalAmount.toFixed(2)} -> ${discountedAmount.toFixed(2)} (${discount}%)`); // TODO: uncomment later
        } else {
            console.log('BYN: not found');
        }
    });

    return products;
}
