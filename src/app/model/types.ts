export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed',
}

export type AppError = string | null;

export type AppInitialState = {
    status: Status;
    error: AppError;
    isInitialized: boolean;
};
