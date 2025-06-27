import { type PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../../common/hooks';
import { authSuccessTC } from '../model/slices/authSlice';

export function AuthProvider({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authSuccessTC());
    }, [dispatch]);

    return <>{children}</>;
}
