import type { LineItem } from '@commercetools/platform-sdk';

export interface CartItemWithAvailability {
    item: LineItem;
    availableQuantity?: number;
}
