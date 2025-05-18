import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/platform-sdk';
import type { AuthState } from '../types';
import { userStorage } from '../../../../common/services/local-storage.service';
import type { AppThunk } from 'app/store';
import { isCustomerSignInResult } from '../../../../common/utils/type-guards';
import { appActions } from 'app/model/slices/appSlice';
import type { SignInFormData } from '../../../../common/validations/signInValidation.schema';
import { authAPI } from '../../api/authApi';
import type { User } from '../../../../common/types';

export const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
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

export const authSuccessTC = (): AppThunk => dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    try {
        const user = userStorage.getUser();

        if (user && isCustomerSignInResult(user)) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        } else {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        }
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(appActions.setAppError({ error: error.message }));
        } else {
            dispatch(appActions.setAppError({ error: 'An unexpected error occurred' }));
        }

        dispatch(appActions.setAppStatus({ status: 'failed' }));
    }
};

export const loginTC =
    (data: SignInFormData): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        try {
            const response: ClientResponse<CustomerSignInResult> = await authAPI.login(data.email, data.password);

            if (response.statusCode === 200) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(authActions.setUser({ user: response.body }));

                userStorage.saveUser(response.body);
                dispatch(appActions.setAppStatus({ status: 'succeeded' }));
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Invalid email or password' }));
            }

            // dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
            dispatch(authActions.setUser({ user: null }));
            dispatch(appActions.setAppStatus({ status: 'failed' }));
        }
    };

export const logOutTC = (): AppThunk => dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));

    dispatch(authActions.setUser({ user: null }));
    userStorage.removeUser();
    dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));

    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
};

export const signUpTC =
    (userData: User): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));

        try {
            const response: ClientResponse<CustomerSignInResult> = await authAPI.register(userData);

            if (response.statusCode === 200) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(authActions.setUser({ user: response.body }));

                userStorage.saveUser(response.body);
                dispatch(appActions.setAppStatus({ status: 'succeeded' }));
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Registration failed' }));
            }

            // dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
            // dispatch(authActions.setUser({user: null})); // ??
            dispatch(appActions.setAppStatus({ status: 'failed' }));
        }
    };
