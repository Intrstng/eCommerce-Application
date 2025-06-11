import type { QueryParam } from '@commercetools/platform-sdk';

export interface ProductType {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    lastModifiedAt: string;
    version: number;
}

export interface ProductsQueryArguments {
    [key: string]: QueryParam | string | string[] | undefined;
    staged?: boolean;
    // where?: string | string[];
}

export interface SearchParameters {
    material?: string;
    gender?: string;
    search?: string;
    currentPage?: string;
    productType?: string;
}

export interface SearchPaginationParameters extends SearchParameters {
    type?: string;
}
