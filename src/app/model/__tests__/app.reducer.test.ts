import { beforeEach, describe, expect, it } from 'vitest';
import { AppError, AppInitialState, Status } from '../types';
import { appActions, appReducer } from '../slices/appSlice';

describe('AppSlice tests', () => {
    let status: Status;
    let error: AppError;
    let isInitialized: boolean;

    let newStatus: Status;
    let newError: AppError;
    let newIsInitialized: boolean;
    let appState: AppInitialState;

    beforeEach(() => {
        status = 'loading';
        error = null;
        isInitialized = false;

        newStatus = 'failed';
        newError = 'Some error occurred';
        newIsInitialized = true;

        appState = {
            status,
            error,
            isInitialized,
        };
    });

    it('appReducer should SET_STATUS', () => {
        const newState = appReducer(appState, appActions.setAppStatus({ status: newStatus }));

        expect(appState.status).toBe(status);
        expect(newState.status).toBe(newStatus);
    });

    it('appReducer should SET_ERROR', () => {
        const newState = appReducer(appState, appActions.setAppError({ error: newError }));

        expect(appState.error).toBe(error);
        expect(newState.error).toBe(newError);
    });

    it('appReducer should SET_IS_INITIALIZED', () => {
        const newState = appReducer(appState, appActions.setAppInitialized({ isInitialized: newIsInitialized }));

        expect(appState.isInitialized).toBe(isInitialized);
        expect(newState.isInitialized).toBe(newIsInitialized);
    });
});
