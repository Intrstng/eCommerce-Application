import type { UnknownAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import { appReducer } from 'app/slices/appSlice'

import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/model/slices/authSlice';

const rootReducer = combineSlices(authSlice); // Added
export type AppRootState = ReturnType<typeof rootReducer>; // Added

// export const store = configureStore({
//     reducer: {
//         // app: appReducer,
//         auth: authReducer,
//     },
// });

export const makeStore = (preloadedState?: Partial<AppRootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    });
    return store;
};

export const store = makeStore();

export type AppStore = typeof store;
// export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>;

Object.defineProperty(globalThis, 'store', {
    value: store,
    writable: true,
});
// // @ts-ignore
// window.store = store;
