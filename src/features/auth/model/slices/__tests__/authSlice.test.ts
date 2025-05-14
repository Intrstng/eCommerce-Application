import type { AuthState } from '../../../../../common/types';
import { authActions, authReducer } from '../authSlice';
import { beforeEach, expect, test } from 'vitest';

let isLoggedIn: boolean;
let newIsLoggedIn: boolean;
let loginState: AuthState;

// We can use tests without beforeEach() because we work with PURE functions
beforeEach(() => {
    isLoggedIn = false;
    newIsLoggedIn = true;
    loginState = {
        user: null,
        isLoggedIn: isLoggedIn,
        loading: false,
        error: null,
    };
});

// ------------------- 'SET_IS_LOGGED_IN' ------------------- //

test('authReducer should SET_IS_LOGGED_IN', () => {
    // action
    const newState_1 = authReducer(loginState, authActions.setIsLoggedIn({ isLoggedIn: newIsLoggedIn }));
    // expectation
    expect(loginState.isLoggedIn).toBe(isLoggedIn);
    expect(newState_1.isLoggedIn).toBe(newIsLoggedIn);
});
