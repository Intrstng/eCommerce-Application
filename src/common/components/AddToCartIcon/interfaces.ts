import type { LineItem } from '@commercetools/platform-sdk';

export type AddToCartIconProps = {
    id: string;
    variantId: number;
    isInCart: boolean;
    currentLineItem?: LineItem;
};
