import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ClientResponse, Customer } from '@commercetools/platform-sdk';
import type { ProfileState } from '../../types';
import type { AppThunk } from 'app/store';
import { appActions } from 'app/model/slices/appSlice';
import { Status } from 'app/model/types';
import { StatusCode } from '../../../../../common/enums';
import type { UpdateCustomerActions } from '../../../api/profileApi';
import { profileApi } from '../../../api/profileApi';
import { successNotifyMessage } from '../../../../../common/utils/notify-message';

export const initialState: ProfileState = {
    customer: null,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setCustomer(state, action: PayloadAction<{ customer: Customer | null }>) {
            state.customer = action.payload.customer;
        },
    },
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;

export const getCurrentCustomerTC = (): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus({ status: Status.LOADING }));

    try {
        const response: ClientResponse<Customer> = await profileApi.getCurrentCustomer();

        if (response.statusCode === StatusCode.OK) {
            dispatch(profileActions.setCustomer({ customer: response.body }));
            dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
        }
    } catch (error) {
        if (error instanceof Error) {
            dispatch(appActions.setAppError({ error: error.message }));
        } else {
            dispatch(appActions.setAppError({ error: 'Receiving current customers profile failed' }));
        }

        // dispatch(profileActions.setCustomer({user: null})); // ??
        dispatch(appActions.setAppStatus({ status: Status.FAILED }));
    }
};

export const changeCurrentCustomersPasswordTC =
    (currentPassword: string, newPassword: string): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));

        try {
            await profileApi.changePassword(currentPassword, newPassword);
            dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));

            successNotifyMessage('You have successfully changed your password');
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Change current customers password failed' }));
            }
            dispatch(appActions.setAppStatus({ status: Status.FAILED }));
        }
    };

export const updateCurrentCustomersPersonalInfoTC =
    (updatedProfileData: UpdateCustomerActions): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));

        try {
            await profileApi.updateCustomer(updatedProfileData);
            dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));

            successNotifyMessage('You have successfully updated your personal info');
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Update current customers personal info failed' }));
            }
            dispatch(appActions.setAppStatus({ status: Status.FAILED }));
        }
    };
