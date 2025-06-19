import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'react-toastify';
import type { AppDispatch } from 'app/store';
import { appActions } from '../../../app/model/slices/appSlice';
import {
    successNotifyMessage,
    warningNotifyMessage,
    errorNotifyMessage,
    errorNotifyMessageWithDispatch,
} from '../notify-message';

vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock('app/store');
vi.mock('app/model/slices/appSlice', () => ({
    appActions: {
        setAppError: vi.fn(),
    },
}));

describe('Test notification utility functions', () => {
    const mockMessage = 'Test message';
    let mockDispatch: AppDispatch;

    beforeEach(() => {
        mockDispatch = vi.fn() as unknown as AppDispatch;
        vi.clearAllMocks();
    });

    describe('successNotifyMessage', () => {
        it('should call toast.success with correct parameters', () => {
            successNotifyMessage(mockMessage);

            expect(toast.success).toHaveBeenCalledWith(mockMessage, {
                position: 'bottom-center',
            });
        });
    });

    describe('warningNotifyMessage', () => {
        it('should call toast.warn with correct parameters', () => {
            warningNotifyMessage(mockMessage);

            expect(toast.warn).toHaveBeenCalledWith(mockMessage, {
                position: 'bottom-center',
            });
        });
    });

    describe('errorNotifyMessage', () => {
        it('should call toast.error with correct parameters', () => {
            errorNotifyMessage(mockMessage);

            expect(toast.error).toHaveBeenCalledWith(mockMessage, {
                position: 'bottom-left',
            });
        });
    });

    describe('errorNotifyMessageWithDispatch', () => {
        it('should call toast.error and dispatch setAppError', () => {
            errorNotifyMessageWithDispatch(mockDispatch, mockMessage);

            expect(toast.error).toHaveBeenCalledWith(mockMessage, {
                position: 'bottom-left',
            });

            expect(mockDispatch).toHaveBeenCalledWith(appActions.setAppError({ error: null }));
        });

        it('should maintain proper call order', () => {
            const callOrder: string[] = [];
            vi.mocked(toast.error).mockImplementation(() => callOrder.push('toast'));
            mockDispatch = vi.fn(() => callOrder.push('dispatch')) as unknown as AppDispatch;

            errorNotifyMessageWithDispatch(mockDispatch, mockMessage);

            expect(callOrder).toEqual(['toast', 'dispatch']);
        });
    });
});
