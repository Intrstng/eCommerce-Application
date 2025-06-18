import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Cart, ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { AuthState } from '../types';
import { userStorage } from '../../../../common/services/local-storage.service';
import type { AppThunk } from 'app/store';
import { isCustomerSignInResult } from '../../../../common/utils/type-guards';
import { appActions } from 'app/model/slices/appSlice';
import type { SignInFormData } from '../../../../common/validations/signInValidation.schema';
import { authAPI } from '../../api/authApi';
import type { User, UserDataLS } from '../../../../common/types';
import { successNotifyMessage } from '../../../../common/utils/notify-message';
import { EnvironmentKeys, StatusCode } from '../../../../common/enums';
import { Status } from 'app/model/types';
import { authTokenService } from '../../../../common/services/auth-token.service';
import { cartActions, createCartTC, getActiveCartTC } from '../../../cart/model/slices/cartSlice';
import { getEnvironmentVariable } from '../../../../common/utils/get-environment-variable';
import { apiRoot } from '../../../../common/api/commercetools';
import { cartAPI } from '../../../cart/api/cartApi';

export const initialState: AuthState = {
    isLoggedIn: !!userStorage.getUser(),
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setUser(state, action: PayloadAction<{ user: CustomerSignInResult | null }>) {
            state.user = action.payload.user;
        },
    },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export const authSuccessTC = (): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus({ status: Status.LOADING }));
    try {
        const user: UserDataLS | null = userStorage.getUser();

        if (user && isCustomerSignInResult(user)) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
            dispatch(getActiveCartTC());
        } else {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));

            // await authTokenService.getAnonymousToken();
            // dispatch(createCartTC());

            await authTokenService.ensureAnonymousToken();
            dispatch(getActiveCartTC()); // ???
        }
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
        dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(appActions.setAppError({ error: error.message }));
        } else {
            dispatch(appActions.setAppError({ error: 'An unexpected error occurred' }));
        }
        dispatch(appActions.setAppStatus({ status: Status.FAILED }));
        authTokenService.clearTokens();
    }
};

export const loginTC =
    (data: SignInFormData): AppThunk =>
    async (dispatch, getState) => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));
        dispatch(appActions.setAppError({ error: null })); // ?? Our setAppError auto cancels after error
        try {
            const anonymousCart = getState().cart.cart;
            const anonymousCartItems = anonymousCart?.lineItems || [];

            const response: ClientResponse<CustomerSignInResult> = await authAPI.login(data.email, data.password);

            if (response.statusCode === StatusCode.OK) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(authActions.setUser({ user: response.body }));
                userStorage.saveUser(response.body);

                const cart = await cartAPI.getActiveCart();
                const userCart: Cart | null = cart || (await cartAPI.createCart());

                if (anonymousCartItems.length > 0 && userCart) {
                    try {
                        const actions = anonymousCartItems.map(item => ({
                            action: 'addLineItem' as const,
                            productId: item.productId,
                            variantId: item.variant.id,
                            quantity: item.quantity,
                        }));

                        await apiRoot
                            .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                            .me()
                            .carts()
                            .withId({ ID: userCart.id })
                            .post({
                                body: {
                                    version: userCart.version,
                                    actions,
                                },
                            })
                            .execute();
                        dispatch(getActiveCartTC());
                    } catch (error) {
                        console.error('Failed to merge cart items:', error);
                    }
                }

                dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));

                successNotifyMessage('You have successfully logged in');
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Invalid email or password' }));
            }

            authTokenService.clearTokens();
            await authTokenService.ensureAnonymousToken();
            dispatch(authActions.setUser({ user: null }));
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
            dispatch(appActions.setAppStatus({ status: Status.FAILED }));
        }
    };

export const logOutTC = (): AppThunk => async dispatch => {
    try {
        await authAPI.logout();
        dispatch(authActions.setUser({ user: null }));
        userStorage.removeUser();
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));

        dispatch(cartActions.setCart({ cart: null }));
        dispatch(createCartTC());

        dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));

        successNotifyMessage("You've logged out of your account");
    } catch (error) {
        if (error instanceof Error) {
            dispatch(appActions.setAppError({ error: error.message }));
        } else {
            dispatch(appActions.setAppError({ error: 'Logout failed' }));
        }
        dispatch(appActions.setAppStatus({ status: Status.FAILED }));
    }
};

export const signUpTC =
    (userData: User): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));

        try {
            const response: ClientResponse<CustomerSignInResult> = await authAPI.register(userData);

            if (response.statusCode === StatusCode.OK) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(authActions.setUser({ user: response.body }));

                userStorage.saveUser(response.body);
                dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));

                successNotifyMessage('You have successfully registered');
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Registration failed' }));
            }

            // dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
            // dispatch(authActions.setUser({user: null})); // ??
            dispatch(appActions.setAppStatus({ status: Status.FAILED }));
        }
    };
