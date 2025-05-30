import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import type { ProfileState } from '../../types';

export const initialState: ProfileState = {
    user: null,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: CustomerSignInResult | null }>) {
            state.user = action.payload.user;
        },
    },
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
