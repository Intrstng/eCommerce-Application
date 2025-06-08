import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { User } from '../../../common/types';
import { apiRoot } from '../../../common/api/commercetools';
import { getEnvironmentVariable } from '../../../common/utils/get-environment-variable';
import { EnvironmentKeys } from '../../../common/enums';
import { authTokenService } from '../../../common/services/auth-token.service';
import { isDuplicateEmailError } from '../../../common/utils/type-guards';

export const authAPI = {
    async login(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
        try {
            const response = await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .customers()
                .get({
                    queryArgs: {
                        where: `email="${email}"`,
                        limit: 1,
                    },
                })
                .execute();

            const accountExists = response.body.count > 0;

            if (!accountExists) {
                throw new Error('Account not found. Please check your email or register a new account.');
            }
            authTokenService.clearTokens();

            try {
                await authTokenService.getCustomerToken(email, password);
            } catch (error) {
                if (
                    error instanceof Error &&
                    (error.message.includes('Customer account with the given credentials not found') ||
                        error.message.includes('invalid_customer_account_credentials'))
                ) {
                    throw new Error('Incorrect password. Please try again.');
                }
                throw error;
            }

            return await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .me()
                .login()
                .post({
                    body: { email, password },
                })
                .execute();
        } catch (error) {
            authTokenService.clearTokens();
            if (
                error instanceof Error &&
                (error.message.includes('Authorization header') || error.message.includes('Bearer'))
            ) {
                throw new Error('Account not found. Please check your email or register a new account.');
            }
            throw error;
        }
    },

    async register({
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
        defaultShippingAddress,
        defaultBillingAddress,
        shippingAddresses,
        billingAddresses,
    }: User): Promise<ClientResponse<CustomerSignInResult>> {
        try {
            await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .customers()
                .post({
                    body: {
                        email,
                        password,
                        firstName,
                        lastName,
                        dateOfBirth,
                        addresses,
                        defaultShippingAddress,
                        defaultBillingAddress,
                        shippingAddresses,
                        billingAddresses,
                    },
                })
                .execute();
            return await this.login(email, password);
        } catch (error) {
            if (isDuplicateEmailError(error)) {
                throw new Error('This email is already registered. Please use a different email or sign in.');
            }

            throw new Error('Registration failed. Please try again.');
        }
    },

    // async getCurrentUser(): Promise<Customer | null> { ToDo: check if will be needed in Sprint 4
    //     try {
    //         const token = authTokenService.getAccessToken();
    //         if (!token) {
    //             return null;
    //         }
    //         const response = await apiRoot
    //             .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
    //             .me()
    //             .get()
    //             .execute();
    //
    //         return response.body;
    //     } catch (error) {
    //         console.error('Get current user error:', error);
    //         authTokenService.clearTokens();
    //         return null;
    //     }
    // },

    async logout(): Promise<void> {
        authTokenService.clearTokens();
        await authTokenService.getAnonymousToken();
    },
};
