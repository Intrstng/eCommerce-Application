/**
 * This file stores:
 *
 * someAppComponent slice
 *
 * fetchSomeAppComponent thunk
 * addSomeAppComponent thunk
 * updateSomeAppComponent thunk
 * removeSomeAppComponent thunk
 *
 * someAppComponentReducer = slice.reducer
 *
 * someAppComponentThunks = {
 *    fetchSomeAppComponent,
 *    addSomeAppComponent,
 *    updateSomeAppComponent,
 *    removeSomeAppComponent
 * }
 *
 * { selectSomeAppComponent } = slice.selectors
 * someAppComponentPath = slice.reducerPath
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * ToDO: change mySlice to someAppComponentSlice
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
