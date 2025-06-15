import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { PromoCodes } from '../../../../common/enums';
import type { DiscountState } from '../interfaces';
import type { DiscountCode } from '@commercetools/platform-sdk';
import type { AppThunk } from 'app/store';
import { Status } from 'app/model/types';
import { appActions } from 'app/model/slices/appSlice';
import { discountAPI } from '../../api/discountApi';

const initialState: DiscountState = {
    promoCode: '',
    availablePromoCodes: [],
};

export const discountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {
        setAvailablePromoCodes(state, action: PayloadAction<{ promoCodes: DiscountCode[] }>) {
            state.availablePromoCodes = action.payload.promoCodes;
        },
        setPromoCode(state, action: PayloadAction<{ promoCode: PromoCodes | '' }>) {
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
