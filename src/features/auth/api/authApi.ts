import { apiRoot } from '../../../shared/api/commercetools';
import type { ClientResponse, CustomerSignInResult, Customer } from '@commercetools/platform-sdk';
import type { User } from '../../../common/types';
import { getEnvironmentVariable } from '../../../shared/api/commercetools';

export const authAPI = {
    async login(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
        try {
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
            console.error('Login error:', error);
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
            console.error('Registration error:', error);
            throw error;
        }
    },

    async getCurrentUser(): Promise<Customer | null> {
        try {
            const response = await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable('VITE_CTP_PROJECT_KEY') })
                .me()
                .get()
                .execute();

            return response.body;
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    },

    logout(): void {
        localStorage.removeItem('user');
    },
};
