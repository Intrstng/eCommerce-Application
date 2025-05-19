import type { UnknownAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/model/slices/authSlice';
import { appSlice } from 'app/model/slices/appSlice';

const rootReducer = combineSlices(appSlice, authSlice);
export type AppRootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<AppRootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    });
    return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>;

Object.defineProperty(globalThis, 'store', {
    value: store,
    writable: true,
});
