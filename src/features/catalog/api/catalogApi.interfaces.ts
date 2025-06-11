import type { Attribute, LocalizedString, ProductVariantAvailability } from '@commercetools/platform-sdk';

export interface ProductPrice {
    id: string;
    value: {
        type: 'centPrecision' | 'highPrecision';
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    country?: string;
    discounted: {
        value: {
            type: 'centPrecision' | 'highPrecision';
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
        };
    } | null;
}

export interface Variant {
    id: number;
    sku?: string;
    attributes?: Attribute[];
    availability?: ProductVariantAvailability;
}

export interface Description {
    ru: string;
    en: string;
}

export interface Name {
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
    totalCount?: number;
}

export interface CatalogCategory {
    externalId?: string;
    id: string;
    key?: string;
    name: LocalizedString;
    orderHint: string;
    slug: LocalizedString;
    productCount: number;
    description?: LocalizedString;
}

export interface CatalogProductSelect {
    sort?: string;
    filter?: string[];
    query?: string;
    limit?: number;
    offset?: number;
}
