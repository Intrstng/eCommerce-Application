import { useEffect, type PropsWithChildren } from 'react';
import { useAppDispatch } from '../../../common/hooks';
import { loginSuccess } from '../model/slices/authSlice';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';

function isCustomerSignInResult(data: unknown): boolean {
    if (!data || typeof data !== 'object') return false;

    return 'customer' in data &&
           typeof data.customer === 'object' &&
           data.customer !== null &&
           'id' in data.customer;
}

export function AuthProvider({ children }: PropsWithChildren) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const parsedData = JSON.parse(userStr);
                if (isCustomerSignInResult(parsedData)) {
                    const userData = parsedData as CustomerSignInResult;
                    dispatch(loginSuccess(userData));
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
