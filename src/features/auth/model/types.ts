import type { CustomerSignInResult } from '@commercetools/platform-sdk';

export type AuthState = {
    user: CustomerSignInResult | null;
    isLoggedIn: boolean;
};
