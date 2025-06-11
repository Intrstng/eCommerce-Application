import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Cart } from '@commercetools/platform-sdk';
import { cartAPI } from '../../api/cartApi';
import type { AppThunk } from 'app/store';
import { appActions } from 'app/model/slices/appSlice';
import { Status } from 'app/model/types';

export interface CartState {
    cart: Cart | null;
    status: Status;
}

const initialState: CartState = {
    cart: null,
    status: Status.IDLE,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<Cart | null>) {
            state.cart = action.payload;
        },
        setStatus(state, action: PayloadAction<Status>) {
            state.status = action.payload;
        },
    },
});

export const { setCart, setStatus } = cartSlice.actions;

export const getActiveCartTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatus(Status.LOADING));
        const cart = await cartAPI.getActiveCart();

        if (cart) {
            dispatch(setCart(cart));
        } else {
            const newCart = await cartAPI.createCart();
            dispatch(setCart(newCart));
        }

        dispatch(setStatus(Status.SUCCEEDED));
    } catch (error) {
        dispatch(setStatus(Status.FAILED));
        dispatch(appActions.setAppError({ error: error instanceof Error ? error.message : 'Failed to get cart' }));
    }
};

export const createCartTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setStatus(Status.LOADING));
        const cart = await cartAPI.createCart();
        dispatch(setCart(cart));
        dispatch(setStatus(Status.SUCCEEDED));
    } catch (error) {
        dispatch(setStatus(Status.FAILED));
        dispatch(appActions.setAppError({ error: error instanceof Error ? error.message : 'Failed to create cart' }));
    }
};

export const addToCartTC =
    (productId: string, variantId: number): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(setStatus(Status.LOADING));
            const { cart } = getState().cart;

            if (cart) {
                const updatedCart = await cartAPI.addToCart(cart.id, cart.version, productId, variantId);
                dispatch(setCart(updatedCart));
            } else {
                const newCart = await cartAPI.createCart();
                const updatedCart = await cartAPI.addToCart(newCart.id, newCart.version, productId, variantId);
                dispatch(setCart(updatedCart));
            }

            dispatch(setStatus(Status.SUCCEEDED));
        } catch (error) {
            dispatch(setStatus(Status.FAILED));
            dispatch(
                appActions.setAppError({ error: error instanceof Error ? error.message : 'Failed to add item to cart' })
            );
        }
    };

export const removeFromCartTC =
    (lineItemId: string): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(setStatus(Status.LOADING));
            const { cart } = getState().cart;

            if (!cart) {
                throw new Error('Cart is not initialized');
            }

            const updatedCart = await cartAPI.removeFromCart(cart.id, cart.version, lineItemId);
            dispatch(setCart(updatedCart));
            dispatch(setStatus(Status.SUCCEEDED));
        } catch (error) {
            dispatch(setStatus(Status.FAILED));
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
            dispatch(setStatus(Status.LOADING));
            const { cart } = getState().cart;

            if (!cart) {
                throw new Error('Cart is not initialized');
            }

            const updatedCart = await cartAPI.updateCart(cart.id, cart.version, lineItemId, quantity);
            dispatch(setCart(updatedCart));
            dispatch(setStatus(Status.SUCCEEDED));
        } catch (error) {
            dispatch(setStatus(Status.FAILED));
            dispatch(
                appActions.setAppError({
                    error: error instanceof Error ? error.message : 'Failed to update item quantity in cart',
                })
            );
        }
    };
