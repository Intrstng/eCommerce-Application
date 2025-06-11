import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CatalogState } from '../types';
import type { CatalogProduct } from '../../api/catalogApi.interfaces';
import type { AppThunk } from 'app/store';
import { appActions } from 'app/model/slices/appSlice';
import { Status } from 'app/model/types';
import { catalogAPI } from '../../api/catalogApi';
import type { ProductType, SearchParameters } from '../../api/interfaces';

export const initialState: CatalogState = {
    products: [],
    product: [],
    totalCount: 0,
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<{ products: CatalogProduct[] }>) {
            state.products = action.payload.products;
        },
        setProduct(state, action: PayloadAction<{ product: CatalogProduct[] }>) {
            state.product = action.payload.product;
        },
        setTotalCount(state, action: PayloadAction<{ totalCount: number }>) {
            state.totalCount = action.payload.totalCount;
        },
    },
});

export const catalogReducer = catalogSlice.reducer;
export const catalogActions = catalogSlice.actions;

export const fetchAllCatalogProductsTC =
    (searchParameters?: SearchParameters, productTypes?: ProductType[], categoryType?: string): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));
        try {
            const response = await catalogAPI.fetchProducts(searchParameters, productTypes, categoryType);
            if (response[0]?.totalCount !== undefined) {
                dispatch(catalogActions.setTotalCount({ totalCount: response[0].totalCount }));
            }

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

export const getProductByIdTC =
    (id: string): AppThunk =>
    async dispatch => {
        dispatch(appActions.setAppStatus({ status: Status.LOADING }));
        try {
            const response = await catalogAPI.getProductByID(id);

            dispatch(catalogActions.setProduct({ product: response }));
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
