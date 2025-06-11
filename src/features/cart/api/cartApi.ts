import { apiRoot } from '../../../common/api/commercetools';
import { projectKey } from '../../../common/api/commercetools-config';
import type { Cart } from '@commercetools/platform-sdk';

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function hasNumberProperty<T extends string>(
    object: Record<string, unknown>,
    property: T
): object is Record<T, number> {
    return property in object && typeof object[property] === 'number';
}

export const cartAPI = {
    async createCart(): Promise<Cart> {
        try {
            const response = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .post({
                    body: {
                        currency: 'EUR',
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to create cart: ${error.message}`)
                    : new Error('Failed to create cart: Unknown error occurred');
            throw error_;
        }
    },

    async getActiveCart(): Promise<Cart | null> {
        try {
            const response = await apiRoot.withProjectKey({ projectKey }).me().activeCart().get().execute();

            return response.body;
        } catch (error: unknown) {
            if (isObject(error) && hasNumberProperty(error, 'statusCode') && error.statusCode === 404) {
                return null;
            }
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to get active cart: ${error.message}`)
                    : new Error('Failed to get active cart: Unknown error occurred');
            throw error_;
        }
    },

    async addToCart(cartId: string, cartVersion: number, productId: string, variantId: number): Promise<Cart> {
        try {
            const response = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cartVersion,
                        actions: [
                            {
                                action: 'addLineItem',
                                productId,
                                variantId,
                                quantity: 1,
                            },
                        ],
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            if (error instanceof Error && error.message.includes('404')) {
                const newCart = await this.createCart();
                return this.addToCart(newCart.id, newCart.version, productId, variantId);
            }
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to add item to cart: ${error.message}`)
                    : new Error('Failed to add item to cart: Unknown error occurred');
            throw error_;
        }
    },

    async removeFromCart(cartId: string, cartVersion: number, lineItemId: string): Promise<Cart> {
        try {
            const response = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cartVersion,
                        actions: [
                            {
                                action: 'removeLineItem',
                                lineItemId,
                            },
                        ],
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            if (error instanceof Error && error.message.includes('404')) {
                return this.createCart();
            }
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to remove item from cart: ${error.message}`)
                    : new Error('Failed to remove item from cart: Unknown error occurred');
            throw error_;
        }
    },

    async updateCart(cartId: string, cartVersion: number, lineItemId: string, quantity: number): Promise<Cart> {
        try {
            const response = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cartVersion,
                        actions: [
                            {
                                action: 'changeLineItemQuantity',
                                lineItemId,
                                quantity,
                            },
                        ],
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            if (error instanceof Error && error.message.includes('404')) {
                return this.createCart();
            }
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to update cart: ${error.message}`)
                    : new Error('Failed to update cart: Unknown error occurred');
            throw error_;
        }
    },
};
