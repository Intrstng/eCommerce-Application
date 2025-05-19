import { authActions, authReducer } from '../authSlice';
import { beforeEach, describe, expect, it } from 'vitest';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { AuthState } from '../../types';

describe('AuthSlice tests', () => {
    let isLoggedIn: boolean;
    let newIsLoggedIn: boolean;
    let newUser: CustomerSignInResult;
    let authState: AuthState;

    beforeEach(() => {
        isLoggedIn = false;
        newIsLoggedIn = true;

        newUser = {
            customer: {
                id: '1',
                version: 2,
                createdAt: '01-01-2025',
                lastModifiedAt: '01-01-2025',
                email: 'test@test.com',
                password: 'abcd1234',
                firstName: 'John',
                lastName: 'Doe',
                addresses: [],
                isEmailVerified: true,
                stores: [],
                authenticationMode: 'Password',
            },
        };

        authState = {
            user: null,
            isLoggedIn: isLoggedIn,
        };
    });

    it('authReducer should SET_IS_LOGGED_IN', () => {
        const newState = authReducer(authState, authActions.setIsLoggedIn({ isLoggedIn: newIsLoggedIn }));

        expect(authState.isLoggedIn).toBe(isLoggedIn);
        expect(newState.isLoggedIn).toBe(newIsLoggedIn);
    });

    it('authReducer should SET_USER', () => {
        const newState = authReducer(authState, authActions.setUser({ user: newUser }));

        expect(authState.user).toBe(null);
        expect(newState.user).toEqual(newUser);
    });
});
