import { apiRoot } from '../../../common/api/commercetools';
import { projectKey } from '../../../common/api/commercetools-config';
import type { Cart } from '@commercetools/platform-sdk';
import { hasNumberProperty, isObject } from '../utils/error-status-code-handler';

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

    async clearCart(cartId: string, cartVersion: number): Promise<Cart> {
        try {
            const cart = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .withId({ ID: cartId })
                .get()
                .execute()
                .then(response => response.body);

            const actions = cart.lineItems.map(item => ({
                action: 'removeLineItem' as const,
                lineItemId: item.id,
            }));

            const response = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .withId({ ID: cartId })
                .post({
                    body: {
                        version: cartVersion,
                        actions,
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to clear cart: ${error.message}`)
                    : new Error('Failed to clear cart: Unknown error occurred');
            throw error_;
        }
    },

    async mergeCarts(anonymousCartId: string): Promise<Cart> {
        try {
            const activeCart = await this.getActiveCart();

            if (!activeCart) {
                return await apiRoot
                    .withProjectKey({ projectKey })
                    .me()
                    .carts()
                    .withId({ ID: anonymousCartId })
                    .get()
                    .execute()
                    .then(response => response.body);
            }

            const lineItems = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .withId({ ID: anonymousCartId })
                .get()
                .execute()
                .then(response => response.body.lineItems);

            const actions = lineItems.map(item => ({
                action: 'addLineItem' as const,
                productId: item.productId,
                variantId: item.variant.id,
                quantity: item.quantity,
            }));

            const response = await apiRoot
                .withProjectKey({ projectKey })
                .me()
                .carts()
                .withId({ ID: activeCart.id })
                .post({
                    body: {
                        version: activeCart.version,
                        actions,
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to merge carts: ${error.message}`)
                    : new Error('Failed to merge carts: Unknown error occurred');
            throw error_;
        }
    },

    async applyPromoCode(cartId: string, cartVersion: number, code: string): Promise<Cart> {
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
                                action: 'addDiscountCode',
                                code,
                            },
                        ],
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to apply promo code: ${error.message}`)
                    : new Error('Failed to apply promo code: Unknown error occurred');
            throw error_;
        }
    },

    async removePromoCode(cartId: string, cartVersion: number, code: string): Promise<Cart> {
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
                                action: 'removeDiscountCode',
                                discountCode: {
                                    typeId: 'discount-code',
                                    id: code,
                                },
                            },
                        ],
                    },
                })
                .execute();

            return response.body;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to remove promo code: ${error.message}`)
                    : new Error('Failed to remove promo code: Unknown error occurred');
            throw error_;
        }
    },

    // async getDiscountCode(discountCodeId: string): Promise<string> {
    //     try {
    //         const discountCode = await apiRoot
    //             .discountCodes()
    //             .withId({ ID: discountCodeId })
    //             .get()
    //             .execute();
    //
    //         console.log('Discount Code:', discountCode.body.code);
    //         return discountCode.body.code;
    //     } catch (error) {
    //         console.error('Error fetching discount code:', error);
    //         throw error; // Rethrow to handle it later
    //     }
    // },
    //
    // async getAllDiscountCodes() {
    //     const response = await apiRoot.withProjectKey({ projectKey }).discountCodes().get().execute();
    //     return response.body.results;
    // },

    // async getDiscountCode = async (discountCodeId: string) => Promise<any> {
    //     try {
    //         const discountCode = apiRoot.withProjectKey({ projectKey }).discountCodes()
    //             .withId({ ID: discountCodeId })
    //             .get()
    //             .execute();
    //
    //
    //         return discountCode.body.code;
    //     } catch (error) {
    //         console.error('Error fetching discount code:', error);
    //         throw error;
    //     }
    // };
};
