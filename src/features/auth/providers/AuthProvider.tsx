import { useEffect, type PropsWithChildren } from 'react';
import { useAppDispatch } from '../../../common/hooks';
import { loginSuccess } from '../model/slices/authSlice';
import { isCustomerSignInResult } from '../../../common/type-guards/customer.guards';

export function AuthProvider({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const parsedData: unknown = JSON.parse(userString);
                if (isCustomerSignInResult(parsedData)) {
                    dispatch(loginSuccess(parsedData));
                } else {
                    console.error('Invalid user data format in localStorage');
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Failed to parse user data from localStorage:', error);
                localStorage.removeItem('user');
            }
        }
    }, [dispatch]);

    return <>{children}</>;
}
