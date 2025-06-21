import type { LineItem } from '@commercetools/platform-sdk';
import type { CatalogProduct } from '../../../features/catalog/api/catalogApi.interfaces';

export interface CartItemWithAvailability {
    item: LineItemWithDiscountedPrice;
    availableQuantity?: number;
    catalogProduct?: CatalogProduct;
}

export interface DiscountedPriceValue {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
}

export interface DiscountedPrice {
    value: DiscountedPriceValue;
    includedDiscounts: unknown[];
}

export interface LineItemWithDiscountedPrice extends LineItem {
    discountedPrice?: DiscountedPrice;
}

export interface CartItemProps {
    item: LineItemWithDiscountedPrice;
    availableQuantity?: number | undefined;
    catalogProduct?: CatalogProduct | undefined;
    showProductDiscountMessage?: boolean;
}
