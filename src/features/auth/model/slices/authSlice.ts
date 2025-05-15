import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import type { AuthState } from '../../../../common/types';
import { userStorage } from '../../../../common/services/local-storage.service';

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        loginStart: state => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<CustomerSignInResult>) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: state => {
            state.user = null;
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
            userStorage.removeUser();
        },
        registerStart: state => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<CustomerSignInResult>) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    setIsLoggedIn,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
