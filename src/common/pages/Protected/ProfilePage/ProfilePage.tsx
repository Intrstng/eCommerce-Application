import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { authAPI } from 'src/features/auth/api/authApi';
import type { Customer } from '@commercetools/platform-sdk';

export const ProfilePage = () => {
    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const fetchCustomerProfile = async () => {
            try {
                const customerData = await authAPI.getCurrentUser();
                setCustomer(customerData || null);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setCustomer(null);
            }
        };

        void fetchCustomerProfile();
    }, []);

    if (!customer) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Profile Not Available</h2>
                <p>Unable to load profile data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Profile Information</h2>

            <div>
                <h3>Details</h3>
                <div>
                    <div>
                        <div>First Name</div>
                        <div>{customer.firstName}</div>
                    </div>
                    <div>
                        <div>Last Name</div>
                        <div>{customer.lastName}</div>
                    </div>
                    <div>
                        <div>Date of Birth</div>
                        <div>
                            {customer.dateOfBirth
                                ? format(new Date(customer.dateOfBirth), 'MMMM dd, yyyy')
                                : 'Not specified'}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3>Addresses</h3>
                <div>
                    <div>
                        <div>Billing Address {customer.billingAddressIds?.length ? '(Default)' : ''}</div>
                        {customer.billingAddressIds?.length ? (
                            <div>
                                {customer.addresses
                                    .filter(address => customer.billingAddressIds?.includes(address.id || ''))
                                    .map(address => (
                                        <div key={address.id}>
                                            {address.streetName}
                                            <br />
                                            {address.city}, {address.postalCode}
                                            <br />
                                            {address.country}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div>No billing address set</div>
                        )}
                    </div>

                    <div>
                        <div>Shipping Address {customer.shippingAddressIds?.length ? '(Default)' : ''}</div>
                        {customer.shippingAddressIds?.length ? (
                            <div>
                                {customer.addresses
                                    .filter(address => customer.shippingAddressIds?.includes(address.id || ''))
                                    .map(address => (
                                        <div key={address.id}>
                                            {address.streetName}
                                            <br />
                                            {address.city}, {address.postalCode}
                                            <br />
                                            {address.country}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div>No shipping address set</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
