import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import type { AppRootState } from 'app/store';

export const profileUserSelector = (state: AppRootState): CustomerSignInResult | null => state.profile.user;
