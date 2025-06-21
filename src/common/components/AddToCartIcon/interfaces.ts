import type { LineItem } from '@commercetools/platform-sdk';

export type AddToCartIconProps = {
    id: string;
    variantId: number;
    isInCart: boolean;
    isToCartLoading: boolean;
    currentLineItem?: LineItem;
};
