import type { AppRootState } from 'app/store';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';

export const authIsLoggedInSelector = (state: AppRootState): boolean => state.auth.isLoggedIn;
export const authUserSelector = (state: AppRootState): CustomerSignInResult | null => state.auth.user;
