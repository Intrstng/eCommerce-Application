import type { ProductPrice } from '../api/catalogApi.interfaces';

export function formatPrice(prices: ProductPrice[], currency = 'USD'): string {
    const currentCurrency = prices.find(price => price.value.currencyCode === currency);

    if (currentCurrency) {
        const centAmount = currentCurrency.value.centAmount;
        const fractionDigits = currentCurrency.value.fractionDigits;

        return `${(centAmount / 100).toFixed(fractionDigits)} ${currency}`;
    }

    return 'N/A';
}

export function formatPriceDiscount(prices: ProductPrice[], currency = 'USD'): string {
    const currentCurrency = prices.find(price => price.value.currencyCode === currency);

    if (currentCurrency) {
        const centAmount = currentCurrency.value.centAmount;
        const fractionDigits = currentCurrency.value.fractionDigits;
        const amount = centAmount / 100;

        return `${(amount + amount * 0.1).toFixed(fractionDigits)} ${currency}`;
    }
    return '';
}

export function isFirstSignInIDOdd(id = ''): boolean {
    const firstChar = id.charAt(0);
    const number = Number.parseInt(firstChar, 10);

    return !Number.isNaN(number) && number % 2 !== 0;
}
