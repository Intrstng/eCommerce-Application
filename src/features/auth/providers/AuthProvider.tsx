import { useEffect, type PropsWithChildren } from 'react';
import { useAppDispatch } from '../../../common/hooks';
import { loginSuccess } from '../model/slices/authSlice';
import type { CustomerSignInResult, Customer } from '@commercetools/platform-sdk';

function isCustomer(value: unknown): value is Customer {
    return value !== null && typeof value === 'object' && 'id' in value && typeof value.id === 'string';
}

function isCustomerSignInResult(data: unknown): data is CustomerSignInResult {
    return data !== null && typeof data === 'object' && 'customer' in data && isCustomer(data.customer);
}

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
