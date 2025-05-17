export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AppError = string | null;

export type AppInitialState = {
    status: Status;
    error: AppError;
    isInitialized: boolean;
};
