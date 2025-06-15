import type { LineItem } from '@commercetools/platform-sdk';

export interface CartItemWithAvailability {
    item: LineItem;
    availableQuantity?: number;
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
