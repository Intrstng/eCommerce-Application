import type {
    ClientResponse,
    Customer,
    CustomerSignInResult,
    MyCustomerUpdateAction,
    Category,
    Product,
} from '@commercetools/platform-sdk';
import type { User } from '../../../common/types';
import { apiRoot } from '../../../common/api/commercetools';
import { getEnvironmentVariable } from '../../../common/utils/get-environment-variable';
import { EnvironmentKeys } from '../../../common/enums';
import { authTokenService } from '../../../common/services/auth-token.service';
import { isDuplicateEmailError } from '../../../common/utils/type-guards';

interface UpdateCustomerActions {
    version: number;
    actions: MyCustomerUpdateAction[];
}

export const authAPI = {
    async login(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
        try {
            await authTokenService.getCustomerToken(email, password);

            return await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .me()
                .login()
                .post({
                    body: {
                        email,
                        password,
                        updateProductData: true,
                    },
                })
                .execute();
        } catch {
            authTokenService.clearTokens();

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
            throw new Error('Incorrect password. Please try again.');
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

    async getCurrentUser(): Promise<Customer> {
        const response = await apiRoot
            .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
            .me()
            .get()
            .execute();
        return response.body;
    },

    async updateCustomer({ version, actions }: UpdateCustomerActions): Promise<Customer> {
        const response = await apiRoot
            .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
            .me()
            .post({
                body: {
                    version,
                    actions,
                },
            })
            .execute();
        return response.body;
    },

    async logout(): Promise<void> {
        authTokenService.clearTokens();
        await authTokenService.getAnonymousToken();
    },

    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        try {
            const customer = await this.getCurrentUser();
            if (!customer) {
                throw new Error('User not found');
            }

            const response = await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .me()
                .password()
                .post({
                    body: {
                        version: customer.version,
                        currentPassword,
                        newPassword,
                    },
                })
                .execute();

            if (!response.body) {
                throw new Error('Failed to change password');
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new TypeError(`Failed to change password: ${error.message}`);
            }
            throw new Error('Failed to change password');
        }
    },

    async getCategories(): Promise<Category[]> {
        const response = await apiRoot
            .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
            .categories()
            .get()
            .execute();
        return response.body.results;
    },

    async getProductsByCategory(categoryType: string): Promise<Product[]> {
        const categories = await this.getCategories();
        const category = categories.find(cat => cat.key?.toLowerCase() === categoryType.toLowerCase());

        if (!category) {
            throw new Error(`Category ${categoryType} not found`);
        }

        const response = await apiRoot
            .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
            .products()
            .get({
                queryArgs: {
                    where: `masterData(current(categories(id="${category.id}")))`,
                },
            })
            .execute();

        return response.body.results;
    },
};
