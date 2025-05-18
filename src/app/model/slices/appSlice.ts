import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppInitialState, Status } from 'app/model/types';

const initialState: AppInitialState = {
    status: 'idle',
    error: null,
    isInitialized: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: Status }>) {
            state.status = action.payload.status;
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        },
    },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
