import type { ClientResponse, CustomerSignInResult, Customer } from '@commercetools/platform-sdk';
import type { User } from '../../../common/types';
import { apiRoot } from '../../../common/api/commercetools';
import { getEnvironmentVariable } from '../../../common/utils/get-environment-variable';
import { authTokenService } from '../../../common/services/auth-token.service';
import { isErrorWithMessage, isDuplicateEmailError } from '../../../common/utils/type-guards';

export const authAPI = {
    async login(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
        try {
            try {
                await authTokenService.getCustomerToken(email, password);
            } catch {
                const projectKey = getEnvironmentVariable('VITE_CTP_PROJECT_KEY');
                const response = await apiRoot
                    .withProjectKey({ projectKey })
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
                throw new Error('Incorrect password. Please try again.');
            }
            return await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable('VITE_CTP_PROJECT_KEY') })
                .me()
                .login()
                .post({
                    body: {
                        email,
                        password,
                    },
                })
                .execute();
        } catch (error) {
            authTokenService.clearTokens();
            if (
                isErrorWithMessage(error) &&
                (error.message === 'Account not found. Please check your email or register a new account.' ||
                    error.message === 'Incorrect password. Please try again.')
            ) {
                throw new Error(error.message);
            }
            throw new Error('Login failed. Please try again.');
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
                .withProjectKey({ projectKey: getEnvironmentVariable('VITE_CTP_PROJECT_KEY') })
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
            authTokenService.clearTokens();

            if (isDuplicateEmailError(error)) {
                throw new Error('This email is already registered. Please use a different email or sign in.');
            }

            throw new Error('Registration failed. Please try again.');
        }
    },

    async getCurrentUser(): Promise<Customer | null> {
        try {
            const token = authTokenService.getAccessToken();
            if (!token) {
                return null;
            }
            const response = await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable('VITE_CTP_PROJECT_KEY') })
                .me()
                .get()
                .execute();

            return response.body;
        } catch (error) {
            console.error('Get current user error:', error);
            authTokenService.clearTokens();
            return null;
        }
    },

    logout(): void {
        authTokenService.clearTokens();
    },
};
