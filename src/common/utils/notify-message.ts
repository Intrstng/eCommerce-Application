import { toast } from 'react-toastify';
import type { AppDispatch } from 'app/store';
import { appActions } from 'app/model/slices/appSlice';

const successNotifyMessage = (message: string) => {
    toast.success(message, {
        position: 'bottom-center',
    });
};

const warningNotifyMessage = (message: string) => {
    toast.warn(message, {
        position: 'bottom-center',
    });
};

const errorNotifyMessage = (dispatch: AppDispatch, message: string) => {
    toast.error(message, {
        position: 'bottom-left',
    });

    dispatch(appActions.setAppError({ error: null }));
};

export { successNotifyMessage, errorNotifyMessage, warningNotifyMessage };
