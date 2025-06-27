import type { CustomerSignInResult } from '@commercetools/platform-sdk';

export type AuthState = {
    isLoggedIn: boolean;
    user: CustomerSignInResult | null;
};
