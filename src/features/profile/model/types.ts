import type { CustomerSignInResult } from '@commercetools/platform-sdk';

export type ProfileState = {
    user: CustomerSignInResult | null;
};
