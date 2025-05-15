import { useEffect, type PropsWithChildren } from 'react';
import { useAppDispatch } from '../../../common/hooks';
import { loginSuccess } from '../model/slices/authSlice';
import { isCustomerSignInResult } from '../../../common/type-guards/customer.guards';
import { userStorage } from '../../../common/services/local-storage.service';

export function AuthProvider({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const user = userStorage.getUser();
        if (user && isCustomerSignInResult(user)) {
            dispatch(loginSuccess(user));
        }
    }, [dispatch]);

    return <>{children}</>;
}
