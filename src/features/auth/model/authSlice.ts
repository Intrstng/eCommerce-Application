/**
 * This file stores:
 *
 * auth slice
 *
 * login thunk
 * logout thunk
 * initializeApp thunk
 *
 * authReducer = slice.reducer
 *
 * authThunks = {
 *    login,
 *    logout,
 *    initializeApp
 * }
 *
 * { selectIsLoggedIn } = slice.selectors
 *
 * authPath = slice.reducerPath
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * ToDO: change mySlice to authSlice
 * Empty template mySlice added to avoid ESLInt Error: "Empty files are not allowed  unicorn/no-empty-file"
 */
const initialState = {};

export const mySlice = createSlice({
    name: 'mySlice',
    initialState,
    reducers: {
        exampleReducer: state => {
            console.log('Example reducer called', state);
        },
    },
});

export const { exampleReducer } = mySlice.actions;
export default mySlice.reducer;
