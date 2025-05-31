import type { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '../../../common/api/commercetools';
import { getEnvironmentVariable } from '../../../common/utils/get-environment-variable';
import { EnvironmentKeys } from '../../../common/enums';

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
        } catch (error) {
            if (error instanceof Error) {
                throw new TypeError(`Failed to change password: ${error.message}`);
            }
            throw new Error('Failed to change password');
        }
    },
};
