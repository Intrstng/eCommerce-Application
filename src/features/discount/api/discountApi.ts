import { apiRoot } from '../../../common/api/commercetools';
import { projectKey } from '../../../common/api/commercetools-config';
import type { DiscountCode } from '@commercetools/platform-sdk';

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

    // async getAllPromoCodes(): Promise<DiscountCodeInfo[] | undefined> {
    //   try {
    //     const cart: Cart | null = await cartAPI.getActiveCart();
    //
    //     if (cart) {
    //       const appliedPromoCodes = cart?.discountCodes;
    //
    //       if (!(appliedPromoCodes) || appliedPromoCodes.length > 0) {
    //         console.log('Promo Codes:', appliedPromoCodes);
    //         return appliedPromoCodes;
    //       } else {
    //         console.log('No promo codes applied');
    //         return [];
    //       }
    //     }
    //   } catch (error: unknown) {
    //     const error_ =
    //         error instanceof Error
    //             ? new Error(`Failed to fetch available promo codes: ${error.message}`)
    //             : new Error('Failed to fetch available promo codes: Unknown error occurred');
    //     throw error_;
    //   }
    // },
};
