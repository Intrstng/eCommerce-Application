import type { Attribute, LocalizedString, ProductVariantAvailability } from '@commercetools/platform-sdk';

export interface ProductPrice {
    id: string;
    value: {
        type: 'centPrecision' | 'highPrecision'; // string
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    country?: string;
    discounted: {
        value: {
            type: 'centPrecision' | 'highPrecision'; // string
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
        };
    } | null;
}

interface Variant {
    id: number;
    sku?: string;
    attributes?: Attribute[];
    availability?: ProductVariantAvailability;
}

interface Description {
    ru: string;
    en: string;
}

interface Name {
    ru: string;
    en: string;
}

export interface CatalogProduct {
    id: string;
    name: Name;
    description: Description;
    prices: ProductPrice[];
    images: string[];
    variants: Variant[];
    isInCart: boolean;
    isInFavourites: boolean;
}

export interface CatalogCategory {
    externalId?: string;
    id: string;
    key?: string;
    name: LocalizedString;
    orderHint: string;
    slug: LocalizedString;
    productCount: number;
}
