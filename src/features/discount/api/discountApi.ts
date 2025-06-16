import { apiRoot } from '../../../common/api/commercetools';
import { projectKey } from '../../../common/api/commercetools-config';
import type { DiscountCode } from '@commercetools/platform-sdk';
import type { Cart } from '@commercetools/platform-sdk';

export const discountAPI = {
    async getAllDiscountCodes(): Promise<DiscountCode[]> {
        try {
            const response = await apiRoot.withProjectKey({ projectKey }).discountCodes().get().execute();
            return response.body.results;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch available promo codes: ${error.message}`)
                    : new Error('Failed to fetch available promo codes: Unknown error occurred');
            throw error_;
        }
    },

    async getDiscountCode(discountCodeId: string): Promise<string> {
        try {
            const discountCode = await apiRoot
                .withProjectKey({ projectKey })
                .discountCodes()
                .withId({ ID: discountCodeId })
                .get()
                .execute();

            console.log('Discount Code:', discountCode.body.code);
            return discountCode.body.code;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch promo code info: ${error.message}`)
                    : new Error('Failed to fetch promo code info: Unknown error occurred');
            throw error_;
        }
    },

    async getInitialDiscountCode(cart: Cart): Promise<DiscountCode | null> {
        try {
            const discountCodes = cart.discountCodes;

            if (!discountCodes || discountCodes.length === 0) {
                return null;
            }

            const discountCodeId = discountCodes[0].discountCode.id;

            const discountCode = await apiRoot
                .withProjectKey({ projectKey })
                .discountCodes()
                .withId({ ID: discountCodeId })
                .get()
                .execute();

            return discountCode.body;
        } catch (error: unknown) {
            const error_ =
                error instanceof Error
                    ? new Error(`Failed to fetch promo code info: ${error.message}`)
                    : new Error('Failed to fetch promo code info: Unknown error occurred');
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

    async removePromoCode(cartId: string, cartVersion: number, codeId: string): Promise<Cart> {
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
                                    id: codeId,
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

    async removePromoCodeByPromoCodeName(cartId: string, cartVersion: number, promoCode: string): Promise<Cart> {
        try {
            const discountCodeResponse = await apiRoot
                .withProjectKey({ projectKey })
                .discountCodes()
                .get({
                    queryArgs: {
                        where: `code="${promoCode}"`,
                    },
                })
                .execute();

            if (discountCodeResponse.body.results.length === 0) {
                throw new Error(`Promo code "${promoCode}" not found`);
            }

            const codeId = discountCodeResponse.body.results[0].id;

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
                                    id: codeId,
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
};
