import type { ProductPrice } from '../api/catalogApi.interfaces';
import type { Currency } from '../ui/CatalogCard/types';

export function formatPrice(prices: ProductPrice[], currency: Currency = 'EUR'): string {
    const currentCurrency = prices.find(price => price.value.currencyCode === currency);

    if (currentCurrency) {
        const centAmount = currentCurrency.value.centAmount;
        const fractionDigits = currentCurrency.value.fractionDigits;

        return `${(centAmount / 100).toFixed(fractionDigits)} ${currency}`;
    }

    return 'N/A';
}
