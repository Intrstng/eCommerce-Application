import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { authAPI } from 'src/features/auth/api/authApi';
import type { Customer, MyCustomerUpdateAction, Address } from '@commercetools/platform-sdk';
import { Button } from 'src/common/components/Button/Button';

interface EditModeData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
}

interface EditAddressData {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
    isDefaultBilling: boolean;
    isDefaultShipping: boolean;
}

export const ProfilePage = () => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isEditAddressMode, setIsEditAddressMode] = useState(false);
    const [editData, setEditData] = useState<EditModeData>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
    });
    const [editAddressData, setEditAddressData] = useState<EditAddressData>({
        streetName: '',
        city: '',
        postalCode: '',
        country: '',
        isDefaultBilling: false,
        isDefaultShipping: false,
    });
    const [updateStatus, setUpdateStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    useEffect(() => {
        const fetchCustomerProfile = async () => {
            try {
                const customerData = await authAPI.getCurrentUser();

                if (customerData) {
                    setCustomer(customerData);
                    setEditData({
                        firstName: customerData.firstName ?? '',
                        lastName: customerData.lastName ?? '',
                        dateOfBirth: customerData.dateOfBirth ?? '',
                        email: customerData.email ?? '',
                    });
                }
                console.log('Personal Information:', {
                    email: customerData.email,
                    firstName: customerData.firstName,
                    lastName: customerData.lastName,
                    dateOfBirth: customerData.dateOfBirth,
                });

                console.log(
                    'Addresses:',
                    customerData.addresses.map(address => ({
                        id: address.id,
                        type:
                            address.id === customerData.defaultBillingAddressId
                                ? 'Default Billing'
                                : address.id === customerData.defaultShippingAddressId
                                  ? 'Default Shipping'
                                  : 'Additional',
                        street: [address.streetNumber, address.streetName].filter(Boolean).join(' '),
                        city: address.city,
                        state: address.state,
                        postalCode: address.postalCode,
                        country: address.country,
                    }))
                );

                console.log('Default Addresses:', {
                    billingAddressId: customerData.defaultBillingAddressId,
                    shippingAddressId: customerData.defaultShippingAddressId,
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        void fetchCustomerProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditMode(true);
        setUpdateStatus({ type: null, message: '' });
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
        if (customer) {
            setEditData({
                firstName: customer.firstName ?? '',
                lastName: customer.lastName ?? '',
                dateOfBirth: customer.dateOfBirth ?? '',
                email: customer.email ?? '',
            });
        }
        setUpdateStatus({ type: null, message: '' });
    };

    const handleSaveClick = async () => {
        if (!customer) return;

        try {
            const actions: MyCustomerUpdateAction[] = [];

            if (editData.firstName !== customer.firstName) {
                actions.push({
                    action: 'setFirstName',
                    firstName: editData.firstName,
                });
            }

            if (editData.lastName !== customer.lastName) {
                actions.push({
                    action: 'setLastName',
                    lastName: editData.lastName,
                });
            }

            if (editData.dateOfBirth !== customer.dateOfBirth) {
                actions.push({
                    action: 'setDateOfBirth',
                    dateOfBirth: editData.dateOfBirth,
                });
            }

            if (editData.email !== customer.email) {
                actions.push({
                    action: 'changeEmail',
                    email: editData.email,
                });
            }

            if (actions.length > 0) {
                const updatedCustomer = await authAPI.updateCustomer({
                    version: customer.version,
                    actions,
                });

                setCustomer(updatedCustomer);
                setIsEditMode(false);
                setUpdateStatus({
                    type: 'success',
                    message: 'Profile updated successfully!',
                });
            } else {
                setIsEditMode(false);
                setUpdateStatus({
                    type: 'success',
                    message: 'No changes to save.',
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setUpdateStatus({
                type: 'error',
                message: 'Failed to update profile. Please try again.',
            });
        }
    };

    const handleInputChange = (field: keyof EditModeData, value: string) => {
        setEditData(previous => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleEditAddressClick = (address: Address) => {
        setIsEditAddressMode(true);
        setEditAddressData({
            streetName: address.streetName ?? '',
            city: address.city ?? '',
            postalCode: address.postalCode ?? '',
            country: address.country ?? '',
            isDefaultBilling: customer?.billingAddressIds?.includes(address.id ?? '') ?? false,
            isDefaultShipping: customer?.shippingAddressIds?.includes(address.id ?? '') ?? false,
        });
        setUpdateStatus({ type: null, message: '' });
    };

    const handleCancelAddressEdit = () => {
        setIsEditAddressMode(false);
        setUpdateStatus({ type: null, message: '' });
    };

    const handleSaveAddress = async (addressId: string) => {
        if (!customer) return;

        try {
            const actions: MyCustomerUpdateAction[] = [];

            // Update address
            actions.push({
                action: 'changeAddress',
                addressId,
                address: {
                    streetName: editAddressData.streetName,
                    city: editAddressData.city,
                    postalCode: editAddressData.postalCode,
                    country: editAddressData.country,
                },
            });

            // Update default billing address
            if (editAddressData.isDefaultBilling) {
                if (!customer.billingAddressIds?.includes(addressId)) {
                    actions.push({
                        action: 'setDefaultBillingAddress',
                        addressId,
                    });
                }
            } else {
                if (customer.billingAddressIds?.includes(addressId)) {
                    actions.push({
                        action: 'removeBillingAddressId',
                        addressId,
                    });
                }
            }

            // Update default shipping address
            if (editAddressData.isDefaultShipping) {
                if (!customer.shippingAddressIds?.includes(addressId)) {
                    actions.push({
                        action: 'setDefaultShippingAddress',
                        addressId,
                    });
                }
            } else {
                if (customer.shippingAddressIds?.includes(addressId)) {
                    actions.push({
                        action: 'removeShippingAddressId',
                        addressId,
                    });
                }
            }

            if (actions.length > 0) {
                const updatedCustomer = await authAPI.updateCustomer({
                    version: customer.version,
                    actions,
                });

                setCustomer(updatedCustomer);
                setIsEditAddressMode(false);
                setUpdateStatus({
                    type: 'success',
                    message: 'Address updated successfully!',
                });
            } else {
                setIsEditAddressMode(false);
                setUpdateStatus({
                    type: 'success',
                    message: 'No changes to save.',
                });
            }
        } catch (error) {
            console.error('Error updating address:', error);
            setUpdateStatus({
                type: 'error',
                message: 'Failed to update address. Please try again.',
            });
        }
    };

    const handleAddressInputChange = (field: keyof EditAddressData, value: string | boolean) => {
        setEditAddressData(previous => ({
            ...previous,
            [field]: value,
        }));
    };
    if (!customer) {
        return <h2>No User Data</h2>;
    }
    return (
        <div>
            <div>
                <h2>Profile Information</h2>
                {isEditMode ? (
                    <div>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                        <Button onClick={handleSaveClick}>Save Changes</Button>
                    </div>
                ) : (
                    <Button onClick={handleEditClick}>Edit Profile</Button>
                )}
            </div>

            {updateStatus.type && <div>{updateStatus.message}</div>}

            <div>
                <h3>Personal Details</h3>
                <div>
                    <div>
                        <div>First Name</div>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={editData.firstName}
                                onChange={event => {
                                    handleInputChange('firstName', event.target.value);
                                }}
                            />
                        ) : (
                            <div>{customer.firstName}</div>
                        )}
                    </div>
                    <div>
                        <div>Last Name</div>
                        {isEditMode ? (
                            <input
                                type="text"
                                value={editData.lastName}
                                onChange={event => {
                                    handleInputChange('lastName', event.target.value);
                                }}
                            />
                        ) : (
                            <div>{customer.lastName}</div>
                        )}
                    </div>
                    <div>
                        <div>Date of Birth</div>
                        {isEditMode ? (
                            <input
                                type="date"
                                value={editData.dateOfBirth}
                                onChange={event => {
                                    handleInputChange('dateOfBirth', event.target.value);
                                }}
                            />
                        ) : (
                            <div>
                                {customer.dateOfBirth
                                    ? format(new Date(customer.dateOfBirth), 'MMMM dd, yyyy')
                                    : 'Not specified'}
                            </div>
                        )}
                    </div>
                    <div>
                        <div>Email</div>
                        {isEditMode ? (
                            <input
                                type="email"
                                value={editData.email}
                                onChange={event => {
                                    handleInputChange('email', event.target.value);
                                }}
                            />
                        ) : (
                            <div>{customer.email}</div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h3>Addresses</h3>
                {customer.addresses.length === 0 ? (
                    <div>No addresses saved yet</div>
                ) : (
                    <div>
                        {customer.addresses.map(address => (
                            <div key={address.id}>
                                <div>
                                    {!isEditAddressMode && (
                                        <Button
                                            onClick={() => {
                                                handleEditAddressClick(address);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </div>
                                {isEditAddressMode ? (
                                    <div>
                                        <div>
                                            <label>Street</label>
                                            <input
                                                type="text"
                                                value={editAddressData.streetName}
                                                onChange={event => {
                                                    handleAddressInputChange('streetName', event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label>City</label>
                                            <input
                                                type="text"
                                                value={editAddressData.city}
                                                onChange={event => {
                                                    handleAddressInputChange('city', event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label>Postal Code</label>
                                            <input
                                                type="text"
                                                value={editAddressData.postalCode}
                                                onChange={event => {
                                                    handleAddressInputChange('postalCode', event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                value={editAddressData.country}
                                                onChange={event => {
                                                    handleAddressInputChange('country', event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={editAddressData.isDefaultBilling}
                                                    onChange={event => {
                                                        handleAddressInputChange(
                                                            'isDefaultBilling',
                                                            event.target.checked
                                                        );
                                                    }}
                                                />
                                                Use as default billing address
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={editAddressData.isDefaultShipping}
                                                    onChange={event => {
                                                        handleAddressInputChange(
                                                            'isDefaultShipping',
                                                            event.target.checked
                                                        );
                                                    }}
                                                />
                                                Use as default shipping address
                                            </label>
                                        </div>
                                        <div>
                                            <Button onClick={handleCancelAddressEdit}>Cancel</Button>
                                            <Button onClick={() => handleSaveAddress(address.id ?? '')}>
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label>Street:</label>
                                        <span>{address.streetName}</span>
                                        <br />
                                        <label>City:</label>
                                        <span>{address.city}</span>
                                        <br />
                                        <label>Postal Code:</label>
                                        <span>{address.postalCode}</span>
                                        <br />
                                        <label>Country:</label>
                                        <span>{address.country}</span>
                                        <div>
                                            {customer.billingAddressIds?.includes(address.id ?? '') && (
                                                <span>Default Billing</span>
                                            )}
                                            {customer.shippingAddressIds?.includes(address.id ?? '') && (
                                                <span>Default Shipping</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
