import type { ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { apiRoot } from '../../../common/api/commercetools';
import { getEnvironmentVariable } from '../../../common/utils/get-environment-variable';
import { EnvironmentKeys } from '../../../common/enums';
import { authTokenService } from '../../../common/services/auth-token.service';

export interface UpdateCustomerActions {
    version: number;
    actions: MyCustomerUpdateAction[];
}

export const profileApi = {
    async getCurrentCustomer(): Promise<ClientResponse<Customer>> {
        try {
            return await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .me()
                .get()
                .execute();
        } catch (error) {
            if (error instanceof Error) {
                throw new TypeError(`Failed to get current customer profile: ${error.message}`);
            }
            throw new Error('Failed to get current customer profile');
        }
    },

    async updateCustomer({ version, actions }: UpdateCustomerActions): Promise<ClientResponse<Customer>> {
        try {
            return await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .me()
                .post({
                    body: {
                        version,
                        actions,
                    },
                })
                .execute();
        } catch (error) {
            if (error instanceof Error) {
                throw new TypeError(`Failed to update current customer profile: ${error.message}`);
            }
            throw new Error('Failed to update current customer profile');
        }
    },

    async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        try {
            const customer = await this.getCurrentCustomer();
            if (!customer) {
                throw new Error('Customer profile not found');
            }

            await apiRoot
                .withProjectKey({ projectKey: getEnvironmentVariable(EnvironmentKeys.CTP_PROJECT_KEY) })
                .me()
                .password()
                .post({
                    body: {
                        version: customer.body.version,
                        currentPassword,
                        newPassword,
                    },
                })
                .execute();

            try {
                const user = customer.body;
                await authTokenService.getCustomerToken(user.email, newPassword);
            } catch (tokenError) {
                console.error('Token refresh failed, but password was changed:', tokenError);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new TypeError(`Failed to change password: ${error.message}`);
            }
            throw new Error('Failed to change password');
        }
    },
};
