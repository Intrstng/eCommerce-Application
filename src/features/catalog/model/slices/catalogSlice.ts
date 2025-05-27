import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CatalogState } from '../types';
import type { CatalogProduct } from '../../api/catalogApi.interfaces';
import type { AppThunk } from 'app/store';
import { appActions } from 'app/model/slices/appSlice';
import { Status } from 'app/model/types';
import { catalogAPI } from '../../api/catalogApi';

export const initialState: CatalogState = {
    products: [],
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<{ products: CatalogProduct[] }>) {
            state.products = action.payload.products;
        },
    },
});

export const catalogReducer = catalogSlice.reducer;
export const catalogActions = catalogSlice.actions;

export const fetchAllCatalogProductsTC = (): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus({ status: Status.LOADING }));
    try {
        const response = await catalogAPI.fetchProducts();

        dispatch(catalogActions.setProducts({ products: response }));
        dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(appActions.setAppError({ error: error.message }));
        } else {
            dispatch(appActions.setAppError({ error: 'An unexpected error occurred' }));
        }
        dispatch(appActions.setAppStatus({ status: Status.FAILED }));
    }
};

export const getProductsByCategoryTC =
    (categoryType: string): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));
        try {
            const response = await catalogAPI.getProductsByCategory(categoryType);

            dispatch(catalogActions.setProducts({ products: response }));
            dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'An unexpected error occurred' }));
            }
            dispatch(appActions.setAppStatus({ status: Status.FAILED }));
        }
    };

// ToDo: Check will we use getCatalogCategoriesTC function in the future (add logic to catalogSlice, add categories to store, add useSelector):
// export const getCatalogCategoriesTC =
//     (): AppThunk =>
//         async dispatch => {
//             dispatch(appActions.setAppStatus({ status: Status.LOADING }));
//             try {
//                 const response = await catalogAPI.fetchCategories();
//
//                 dispatch(catalogActions.setCategories({ categories: response }));
//                 dispatch(appActions.setAppStatus({ status: Status.SUCCEEDED }));
//             } catch (error) {
//                 if (error instanceof Error) {
//                     dispatch(appActions.setAppError({ error: error.message }));
//                 } else {
//                     dispatch(appActions.setAppError({ error: 'An unexpected error occurred' }));
//                 }
//                 dispatch(appActions.setAppStatus({ status: Status.FAILED }));
//             }
//         };
