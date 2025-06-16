import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { DiscountState } from '../interfaces';
import type { Cart, DiscountCode } from '@commercetools/platform-sdk';
import type { AppThunk } from 'app/store';
import { Status } from 'app/model/types';
import { appActions } from 'app/model/slices/appSlice';
import { discountAPI } from '../../api/discountApi';
import type { PromoCodeCartContent } from '../../../../common/types';
import { cartActions } from '../../../cart/model/slices/cartSlice';
import { successNotifyMessage, warningNotifyMessage } from '../../../../common/utils/notify-message';
import { transformToPromoCodeCartContent } from '../../../../common/utils/transform-to-promo-code-cart-content';
import { authTokenService } from '../../../../common/services/auth-token.service';

const initialState: DiscountState = {
    promoCode: null,
    availablePromoCodes: [],
};

export const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {
        setAvailablePromoCodes(state, action: PayloadAction<{ promoCodes: DiscountCode[] }>) {
            state.availablePromoCodes = action.payload.promoCodes;
        },
        setPromoCode(state, action: PayloadAction<{ promoCode: PromoCodeCartContent | null }>) {
            state.promoCode = action.payload.promoCode;
        },
    },
});

export const discountReducer = discountSlice.reducer;
export const discountActions = discountSlice.actions;

export const getAvailablePromoCodesTC = (): AppThunk => async dispatch => {
    try {
        dispatch(appActions.setAppStatus({ status: Status.LOADING })); // app - not cart

        const discountCodes = await discountAPI.getAllDiscountCodes();

        dispatch(discountActions.setAvailablePromoCodes({ promoCodes: discountCodes }));

        dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED })); // app - not cart
    } catch (error) {
        dispatch(appActions.setAppStatus({ status: Status.FAILED })); // app - not cart
        dispatch(
            appActions.setAppError({
                error: error instanceof Error ? error.message : 'Failed to get available promo codes',
            })
        );
    }
};

export const setActivePromoCodeTC =
    (cart: Cart): AppThunk =>
    async dispatch => {
        try {
            const accessToken = authTokenService.getAccessToken();
            if (!accessToken) {
                dispatch(discountActions.setPromoCode({ promoCode: null }));
                dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
                return;
            }

            if (cart) {
                // TODO: check cart - get cart inside the setActivePromoCodeTC()
                dispatch(appActions.setAppStatus({ status: Status.LOADING }));
                const currentDiscount = await discountAPI.getInitialDiscountCode(cart);

                if (currentDiscount) {
                    const currentPromoCodeCartContent = transformToPromoCodeCartContent(currentDiscount);

                    dispatch(discountActions.setPromoCode({ promoCode: currentPromoCodeCartContent }));
                    dispatch(appActions.setAppStatus({ status: Status.FAILED }));
                    return;
                }
                dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
            }
        } catch (error) {
            dispatch(appActions.setAppStatus({ status: Status.FAILED }));
            dispatch(
                appActions.setAppError({
                    error: error instanceof Error ? error.message : 'Failed to get active promo code',
                })
            );
        }
    };

export const applyPromoCodeTC =
    (cart: Cart, code: string): AppThunk =>
    async dispatch => {
        try {
            dispatch(cartActions.setStatus({ status: Status.LOADING }));

            let currentCart: Cart = cart;
            let currentVersion: number = cart.version;

            if (currentVersion) {
                const discountCodes = currentCart?.discountCodes ?? [];
                for (const discount of discountCodes) {
                    currentCart = await discountAPI.removePromoCode(cart.id, currentVersion, discount.discountCode.id);
                    currentVersion = currentCart.version;
                }
                currentCart = await discountAPI.applyPromoCode(cart.id, currentVersion, code);

                dispatch(cartActions.setCart({ cart: currentCart }));
                dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
                successNotifyMessage(`Promo code ${code} applied successfully!`);
            }
        } catch (error) {
            dispatch(cartActions.setStatus({ status: Status.FAILED }));
            dispatch(
                appActions.setAppError({
                    error: error instanceof Error ? error.message : `Failed to apply promo code ${code}`,
                })
            );
        }
    };

export const removePromoCodeTC =
    (cartId: string, cartVersion: number, code: string): AppThunk =>
    async dispatch => {
        try {
            dispatch(cartActions.setStatus({ status: Status.LOADING })); // cart
            // const updatedCart = await discountAPI.removePromoCode(cartId, cartVersion, code);
            const updatedCart = await discountAPI.removePromoCodeByPromoCodeName(cartId, cartVersion, code);

            dispatch(cartActions.setCart({ cart: updatedCart }));
            dispatch(cartActions.setStatus({ status: Status.SUCCEEDED })); // cart
            warningNotifyMessage(`Promo code ${code} removed successfully!`);
        } catch (error) {
            dispatch(cartActions.setStatus({ status: Status.FAILED })); // cart
            dispatch(
                appActions.setAppError({
                    error: error instanceof Error ? error.message : `Failed to remove promo code ${code}`,
                })
            );
        }
    };
