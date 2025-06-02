import Typography from '@mui/material/Typography';
import { STYLES } from './styles.addressesPage';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import {
    getCurrentCustomerTC,
    updateCurrentCustomersPersonalInfoTC,
} from '../../../../../features/profile/model/slices/__tests__/profileSlice';
import { profileCustomerSelector } from '../../../../../features/profile/model/selectors/profileSelector';
import type { Address, ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';
import { statusSelector } from 'app/model/selectors/appSelectors';
import type { Status } from 'app/model/types';
import { AddressCard } from '../../../../components/AddressCard/AddressCard';
import Dialog from '@mui/material/Dialog';
import { AddAddressModalForm } from '../../../../components/ModalWindow/AddAddressModalForm/AddAddressModalForm';
import { AddressModalType, DefaultAddressStatus } from '../../../../enums';
import type { AddressModalFormData } from '../../../../validations/addressModalFormValidation';
import type { AddAddressAction } from './interfaces';
import { profileApi } from '../../../../../features/profile/api/profileApi';
import { appActions } from 'app/model/slices/appSlice';


export const AddressesPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<AddressModalType | null>(null);
    const dispatch = useAppDispatch();
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);

    const currentAddresses: Address[] =
        currentCustomer && 'addresses' in currentCustomer ? currentCustomer.addresses : [];
    const shippingAddressIds: string[] | undefined =
        currentCustomer && 'shippingAddressIds' in currentCustomer ? currentCustomer.shippingAddressIds : [];
    const billingAddressIds: string[] | undefined =
        currentCustomer && 'billingAddressIds' in currentCustomer ? currentCustomer.billingAddressIds : [];

    let currentCustomerVersion = 0;

    if (currentCustomer && 'version' in currentCustomer) {
        currentCustomerVersion = currentCustomer.version;
    }

    const handleOpenModal = (type: AddressModalType) => {
        setModalType(type);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDeleteAddress = (addressId: string) => {
        if (!currentCustomer || !addressId) return;

        let currentCustomerVersion = 0;

        if ('version' in currentCustomer) {
            currentCustomerVersion = currentCustomer.version;
        }

        const actions: MyCustomerUpdateAction[] = [
            {
                action: 'removeAddress',
                addressId,
            },
        ];

        if (actions.length > 0) {
            dispatch(
                updateCurrentCustomersPersonalInfoTC({
                    version: currentCustomerVersion,
                    actions,
                })
            );
        }
    };

    const handleSaveAddress = async (address?: AddressModalFormData, addressId?: string) => {
        if (!currentCustomer) return;

        try {
            const actions: MyCustomerUpdateAction[] = [];

            if (!addressId && address) {
                // Add new address
                const addAddressAction: AddAddressAction = {
                    action: 'addAddress',
                    address: {
                        streetName: address.street,
                        city: address.city,
                        postalCode: address.postal,
                        country: address.country,
                    },
                };
                actions.push(addAddressAction);

                const updatePayload = {
                    version: currentCustomerVersion,
                    actions,
                };

                const response: ClientResponse<Customer> = await profileApi.updateCustomer(updatePayload);

                let addressesCollection: Address[];
                let createdAddress: Address | undefined;
                let updatedCurrentCustomerVersion = 0;

                if (response.body.addresses) {
                    addressesCollection = response.body.addresses;
                    createdAddress = addressesCollection.at(-1);
                    updatedCurrentCustomerVersion = response.body.version;

                    if (createdAddress?.id) {
                        handleSetDefaultAddress(
                            !!address.isDefaultShippingAddress,
                            !!address.isDefaultBillingAddress,
                            createdAddress.id,
                            updatedCurrentCustomerVersion
                        );
                    }
                }
            } else if (addressId && address) {
                // Update existing address
                actions.push({
                    action: 'changeAddress',
                    addressId,
                    address: {
                        streetName: address.street,
                        city: address.city,
                        postalCode: address.postal,
                        country: address.country,
                    },
                });

                // Update default billing address
                if (address.isDefaultBillingAddress) {
                    if (!currentCustomer.billingAddressIds?.includes(addressId)) {
                        actions.push({
                            action: 'setDefaultBillingAddress',
                            addressId,
                        });
                    }
                } else {
                    if (currentCustomer.billingAddressIds?.includes(addressId)) {
                        actions.push({
                            action: 'removeBillingAddressId',
                            addressId,
                        });
                    }
                }
                // Update default shipping address
                if (address.isDefaultShippingAddress) {
                    if (!currentCustomer.shippingAddressIds?.includes(addressId)) {
                        actions.push({
                            action: 'setDefaultShippingAddress',
                            addressId,
                        });
                    }
                } else {
                    if (currentCustomer.shippingAddressIds?.includes(addressId)) {
                        actions.push({
                            action: 'removeShippingAddressId',
                            addressId,
                        });
                    }
                }

                dispatch(
                    updateCurrentCustomersPersonalInfoTC({
                        version: currentCustomerVersion,
                        actions,
                    })
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(appActions.setAppError({ error: error.message }));
            } else {
                dispatch(appActions.setAppError({ error: 'Update current customers personal info failed' }));
            }
        }
    };

    const handleSetDefaultAddress = (
        isDefaultShippingAddress: boolean,
        isDefaultBillingAddress: boolean,
        addressId: string,
        currentCustomerVersion: number
    ): void => {
        if (!currentCustomer) return;

        const actions: MyCustomerUpdateAction[] = [];
        // Update default billing address
        if (isDefaultBillingAddress) {
            actions.push({
                action: 'setDefaultBillingAddress',
                addressId: addressId,
            });
        }
        // Update default shipping address
        if (isDefaultShippingAddress) {
            actions.push({
                action: 'setDefaultShippingAddress',
                addressId: addressId,
            });
        }

        dispatch(
            updateCurrentCustomersPersonalInfoTC({
                version: currentCustomerVersion,
                actions,
            })
        );
    };

    const handleSetDefaultAddressByClick = (
        isDefaultShippingAddress: DefaultAddressStatus,
        isDefaultBillingAddress: DefaultAddressStatus,
        addressId: string,
        addressToToggle: AddressModalType
    ): void => {
        if (!currentCustomer) return;

        const actions: MyCustomerUpdateAction[] = [];
        // Update default billing address
        if (isDefaultBillingAddress === DefaultAddressStatus.ON && addressToToggle === AddressModalType.BILLING) {
            if (!currentCustomer.billingAddressIds?.includes(addressId)) {
                actions.push({
                    action: 'setDefaultBillingAddress',
                    addressId,
                });
            }
        } else if (
            isDefaultBillingAddress === DefaultAddressStatus.OFF &&
            addressToToggle === AddressModalType.BILLING &&
            currentCustomer.billingAddressIds?.includes(addressId)
        ) {
            actions.push({
                action: 'removeBillingAddressId',
                addressId,
            });
        }
        // Update default shipping address
        if (isDefaultShippingAddress === DefaultAddressStatus.ON && addressToToggle === AddressModalType.SHIPPING) {
            if (!currentCustomer.shippingAddressIds?.includes(addressId)) {
                actions.push({
                    action: 'setDefaultShippingAddress',
                    addressId,
                });
            }
        } else if (
            isDefaultShippingAddress === DefaultAddressStatus.OFF &&
            addressToToggle === AddressModalType.SHIPPING &&
            currentCustomer.shippingAddressIds?.includes(addressId)
        ) {
            actions.push({
                action: 'removeShippingAddressId',
                addressId,
            });
        }

        dispatch(
            updateCurrentCustomersPersonalInfoTC({
                version: currentCustomerVersion,
                actions,
            })
        );
    };

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    return (
        <Box sx={STYLES.addressCardsContent}>
            <Typography variant="h3" component="h3" sx={STYLES.addressesTitle}>
                Addresses
            </Typography>

            <Box sx={STYLES.addressCards}>
                {currentAddresses.length > 0 ? (
                    currentAddresses.map(address => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            deleteAddressCB={handleDeleteAddress}
                            editAddressCB={handleSaveAddress}
                            toggleDefaultAddressesCB={handleSetDefaultAddressByClick}
                            shippingAddressIds={shippingAddressIds ?? []}
                            billingAddressIds={billingAddressIds ?? []}
                        />
                    ))
                ) : (
                    <Box sx={STYLES.emptyAddressMessage}>
                        <Typography variant="body1" sx={STYLES.emptyAddressMessageTitle}>
                            You haven't added any addresses yet
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box sx={STYLES.addressControls}>
                <Button
                    sx={{
                        ...STYLES.addressButton,
                        ...STYLES.billingAddButton,
                    }}
                    type="button"
                    variant="contained"
                    color="info"
                    onClick={() => {
                        handleOpenModal(AddressModalType.BILLING);
                    }}
                    disabled={appStatus === 'loading'}
                >
                    Add new billing address
                </Button>
                <Button
                    sx={{
                        ...STYLES.addressButton,
                        ...STYLES.shippingAddButton,
                    }}
                    type="button"
                    variant="contained"
                    color="info"
                    onClick={() => {
                        handleOpenModal(AddressModalType.SHIPPING);
                    }}
                    disabled={appStatus === 'loading'}
                >
                    Add new shipping address
                </Button>
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal} sx={STYLES.dialog}>
                <AddAddressModalForm
                    modalType={modalType}
                    closeModalCB={handleCloseModal}
                    addAddressCB={handleSaveAddress}
                />
            </Dialog>
        </Box>
    );
};
