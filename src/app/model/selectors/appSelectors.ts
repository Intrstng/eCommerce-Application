import type { AppRootState } from 'app/store';
import type { AppError, Status } from 'app/model/types';

export const statusSelector = (state: AppRootState): Status => state.app.status;
export const errorSelector = (state: AppRootState): AppError => state.app.error;
export const isInitializedSelector = (state: AppRootState): boolean => state.app.isInitialized;
export const isLoggingOutSelector = (state: AppRootState): boolean => state.app.isLoggingOut;
