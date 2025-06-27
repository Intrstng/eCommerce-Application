import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '@commercetools/platform-sdk';
import { cartAPI } from '../../api/cartApi';
import type { AppThunk } from 'app/store';
import { appActions } from 'app/model/slices/appSlice';
import { Status } from 'app/model/types';
import type { CartState } from '../interfaces';
import { successNotifyMessage, warningNotifyMessage } from '../../../../common/utils/notify-message';
import { catalogActions } from '../../../catalog/model/slices/catalogSlice';

const initialState: CartState = {
    cart: null,
    status: Status.IDLE,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<{ cart: Cart | null }>) {
            state.cart = action.payload.cart;
        },
        setStatus(state, action: PayloadAction<{ status: Status }>) {
            state.status = action.payload.status;
        },
    },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

export const getActiveCartTC = (): AppThunk => async dispatch => {
    try {
        dispatch(cartActions.setStatus({ status: Status.LOADING }));

        const cart = await cartAPI.getActiveCart();

        if (cart) {
            dispatch(cartActions.setCart({ cart }));
        } else {
            const newCart = await cartAPI.createCart();
            dispatch(cartActions.setCart({ cart: newCart }));
        }

        dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
    } catch (error) {
        dispatch(cartActions.setStatus({ status: Status.FAILED }));
        dispatch(appActions.setAppError({ error: error instanceof Error ? error.message : 'Failed to get cart' }));
    }
};

export const createCartTC = (): AppThunk => async dispatch => {
    try {
        console.log('createCartTC');
        dispatch(cartActions.setStatus({ status: Status.LOADING }));

        const cart = await cartAPI.createCart();
        dispatch(cartActions.setCart({ cart }));

        dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
    } catch (error) {
        dispatch(cartActions.setStatus({ status: Status.FAILED }));
        dispatch(appActions.setAppError({ error: error instanceof Error ? error.message : 'Failed to create cart' }));
    }
};

export const addToCartTC =
    (productId: string, variantId: number): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(cartActions.setStatus({ status: Status.LOADING }));
            dispatch(catalogActions.setIsToCartLoading({ id: productId, isToCartLoading: true }));
            const { cart } = getState().cart;

            if (cart) {
                const updatedCart = await cartAPI.addToCart(cart.id, cart.version, productId, variantId);
                dispatch(cartActions.setCart({ cart: updatedCart }));
            } else {
                const newCart = await cartAPI.createCart();
                const updatedCart = await cartAPI.addToCart(newCart.id, newCart.version, productId, variantId);
                dispatch(cartActions.setCart({ cart: updatedCart }));
            }

            dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
            dispatch(catalogActions.setIsToCartLoading({ id: productId, isToCartLoading: false }));
            successNotifyMessage('Product was added to your cart successfully!');
        } catch (error) {
            dispatch(cartActions.setStatus({ status: Status.FAILED }));
            dispatch(catalogActions.setIsToCartLoading({ id: productId, isToCartLoading: false }));
            dispatch(
                appActions.setAppError({ error: error instanceof Error ? error.message : 'Failed to add item to cart' })
            );
        }
    };

export const removeFromCartTC =
    (lineItemId: string, productId?: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(cartActions.setStatus({ status: Status.LOADING }));
            if (productId) {
                dispatch(catalogActions.setIsToCartLoading({ id: productId, isToCartLoading: true }));
            }
            const { cart } = getState().cart;

            if (!cart) {
                dispatch(cartActions.setCart({ cart: null }));
                dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
                if (productId) {
                    dispatch(catalogActions.setIsToCartLoading({ id: productId, isToCartLoading: false }));
                }
                return;
            }

            const updatedCart = await cartAPI.removeFromCart(cart.id, cart.version, lineItemId);
            dispatch(cartActions.setCart({ cart: updatedCart }));

            dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
            if (productId) {
                dispatch(catalogActions.setIsToCartLoading({ id: productId, isToCartLoading: false }));
            }
            warningNotifyMessage('Product was removed from your cart successfully!');
        } catch (error) {
            dispatch(cartActions.setStatus({ status: Status.FAILED }));
            if (productId) {
                dispatch(catalogActions.setIsToCartLoading({ id: productId, isToCartLoading: false }));
            }
            dispatch(
                appActions.setAppError({
                    error: error instanceof Error ? error.message : 'Failed to remove item from cart',
                })
            );
        }
    };

export const updateCartTC =
    (lineItemId: string, quantity: number): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(cartActions.setStatus({ status: Status.LOADING }));
            const { cart } = getState().cart;

            if (!cart) {
                dispatch(cartActions.setCart({ cart: null }));
                dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
                return;
            }

            const updatedCart = await cartAPI.updateCart(cart.id, cart.version, lineItemId, quantity);
            dispatch(cartActions.setCart({ cart: updatedCart }));

            dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
            successNotifyMessage('The quantity in the basket has been updated');
        } catch (error) {
            dispatch(cartActions.setStatus({ status: Status.FAILED }));
            dispatch(
                appActions.setAppError({
                    error: error instanceof Error ? error.message : 'Failed to update item quantity in cart',
                })
            );
        }
    };

export const clearCartTC = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(cartActions.setStatus({ status: Status.LOADING }));
        const { cart } = getState().cart;

        if (!cart) {
            dispatch(cartActions.setCart({ cart: null }));
            dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
            return;
        }

        const updatedCart = await cartAPI.clearCart(cart.id, cart.version);
        dispatch(cartActions.setCart({ cart: updatedCart }));
        dispatch(cartActions.setStatus({ status: Status.SUCCEEDED }));
        successNotifyMessage('Your cart was cleared successfully!');
    } catch (error) {
        dispatch(cartActions.setStatus({ status: Status.FAILED }));
        dispatch(
            appActions.setAppError({
                error: error instanceof Error ? error.message : 'Failed to clear cart',
            })
        );
    }
};
