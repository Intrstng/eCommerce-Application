import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { AuthState } from '../types';
import { userStorage } from '../../../../common/services/local-storage.service';
import type { AppThunk } from 'app/store';
import { isCustomerSignInResult } from '../../../../common/utils/type-guards';
import { appActions } from 'app/model/slices/appSlice';
import type { SignInFormData } from '../../../../common/validations/signInValidation.schema';
import { authAPI } from '../../api/authApi';
import type { User } from '../../../../common/types';
import { successNotifyMessage } from '../../../../common/utils/notify-message';
import { StatusCode } from '../../../../common/enums';
import { Status } from 'app/model/types';
import { authTokenService } from '../../../../common/services/auth-token.service';
import type { UserDataLS } from '../../../../common/types';
import { profileActions } from '../../../profile/model/slices/__tests__/profileSlice';

export const initialState: AuthState = {
    isLoggedIn: !!userStorage.getUser(),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export const authSuccessTC = (): AppThunk => dispatch => {
    dispatch(appActions.setAppStatus({ status: Status.LOADING }));
    try {
        const user: UserDataLS | null = userStorage.getUser();

        if (user && isCustomerSignInResult(user)) {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        } else {
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
            authTokenService.clearTokens();
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
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));
        try {
            const response: ClientResponse<CustomerSignInResult> = await authAPI.login(data.email, data.password);

            if (response.statusCode === StatusCode.OK) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(profileActions.setUser({ user: response.body }));
                console.log(response.body);
                userStorage.saveUser(response.body);
                dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));

                successNotifyMessage('You have successfully logged in');
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Invalid email or password' }));
            }

            // dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
            dispatch(profileActions.setUser({ user: null }));
            dispatch(appActions.setAppStatus({ status: Status.FAILED }));
        }
    };

export const logOutTC = (): AppThunk => dispatch => {
    dispatch(appActions.setAppStatus({ status: Status.LOADING }));
    authAPI.logout();
    dispatch(profileActions.setUser({ user: null }));
    userStorage.removeUser();
    dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));

    dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
    successNotifyMessage("You've logged out of your account");
};

export const signUpTC =
    (userData: User): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));

        try {
            const response: ClientResponse<CustomerSignInResult> = await authAPI.register(userData);

            if (response.statusCode === StatusCode.OK) {
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(profileActions.setUser({ user: response.body }));

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
