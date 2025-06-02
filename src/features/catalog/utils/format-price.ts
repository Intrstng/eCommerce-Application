import type { ProductPrice } from '../api/catalogApi.interfaces';

/**
 * Formats product price in "100.00 EUR" formatAdd commentMore actions
 * @param prices - Array of product prices from commercetools
 * @param currency - Currency code (default: 'EUR')
 * @returns Formatted price string or "N/A" if price not found
 */
export function formatPrice(prices: ProductPrice[], currency = 'EUR'): string {
    const price = prices.find(p => p?.value?.currencyCode === currency);

    if (!price?.value) return 'N/A';

    const amount = price.value.centAmount / Math.pow(10, price.value.fractionDigits ?? 2);
    return `${amount.toFixed(price.value.fractionDigits ?? 2)} ${currency}`;
}

/**Add commentMore actions
 * Formats discounted price from commercetools
 * @param prices - Array of product prices
 * @param currency - Currency code (default: 'EUR')
 * @returns Discounted price string or empty string if no discount
 */
export function formatPriceDiscount(prices: ProductPrice[], currency = 'EUR'): string {
    const price = prices.find(p => p?.value?.currencyCode === currency);

    if (!price?.discounted?.value) return '';

    const amount =
        price.discounted.value.centAmount /
        Math.pow(10, price.discounted.value.fractionDigits ?? price.value.fractionDigits ?? 2);
    return `${amount.toFixed(price.discounted.value.fractionDigits ?? 2)} ${currency}`;
}
