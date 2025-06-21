import Typography from '@mui/material/Typography';
import { STYLES } from './styles.addressesPage';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import {
    getCurrentCustomerTC,
    profileSlice,
    updateCurrentCustomersPersonalInfoTC,
} from '../../../../../features/profile/model/slices/__tests__/profileSlice';
import {
    profileCustomerSelector,
    profileDefaultBillingAddressIdSelector,
    profileDefaultShippingAddressIdSelector,
} from '../../../../../features/profile/model/selectors/profileSelector';
import type { Address, ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';
import { statusSelector } from 'app/model/selectors/appSelectors';
import type { Status } from 'app/model/types';
import { AddressCard } from '../../../../components/AddressCard/AddressCard';
import Dialog from '@mui/material/Dialog';
import { AddAddressModalForm } from '../../../../components/ModalWindow/AddAddressModalForm/AddAddressModalForm';
import { AddressModalType, AddressStatus } from '../../../../enums';
import type { AddressModalFormData } from '../../../../validations/addressModalFormValidation.schema';
import type { AddAddressAction } from './interfaces';
import { profileApi } from '../../../../../features/profile/api/profileApi';
import { appActions } from 'app/model/slices/appSlice';

export const AddressesPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<AddressModalType | null>(null);
    const dispatch = useAppDispatch();
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    const currentDefaultShippingAddressId = useAppSelector<string>(profileDefaultShippingAddressIdSelector);
    const currentDefaultBillingAddressId = useAppSelector<string>(profileDefaultBillingAddressIdSelector);

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
        // Clear current default address record in store
        if (currentDefaultShippingAddressId === addressId) {
            console.log('currentDefaultShippingAddressId deleted');
            dispatch(profileSlice.actions.setDefaultShippingAddressId({ addressId: '' }));
        }
        if (currentDefaultBillingAddressId === addressId) {
            dispatch(profileSlice.actions.setDefaultBillingAddressId({ addressId: '' }));
        }

        dispatch(
            updateCurrentCustomersPersonalInfoTC({
                version: currentCustomerVersion,
                actions,
            })
        );
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

                    if (createdAddress?.id && address.addressType) {
                        handleSetIsDefaultAddress(
                            !!address.isDefaultShippingAddress,
                            !!address.isDefaultBillingAddress,
                            createdAddress.id,
                            address.addressType,
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

    const handleSetIsDefaultAddress = (
        isShippingAddress: boolean,
        isBillingAddress: boolean,
        addressId: string,
        addressType: AddressModalType,
        currentCustomerVersion: number
    ): void => {
        if (!currentCustomer) return;

        const actions: MyCustomerUpdateAction[] = [];
        // Set address type to billing
        if (addressType === AddressModalType.BILLING) {
            actions.push({
                action: 'addBillingAddressId',
                addressId: addressId,
            });
        }
        // Set address type to shipping
        if (addressType === AddressModalType.SHIPPING) {
            actions.push({
                action: 'addShippingAddressId',
                addressId: addressId,
            });
        }
        // Update default billing address
        if (isBillingAddress) {
            actions.push({
                action: 'setDefaultBillingAddress',
                addressId: addressId,
            });
            dispatch(profileSlice.actions.setDefaultBillingAddressId({ addressId }));
        }
        // Update default shipping address
        if (isShippingAddress) {
            actions.push({
                action: 'setDefaultShippingAddress',
                addressId: addressId,
            });
            dispatch(profileSlice.actions.setDefaultShippingAddressId({ addressId }));
        }

        dispatch(
            updateCurrentCustomersPersonalInfoTC({
                version: currentCustomerVersion,
                actions,
            })
        );
    };

    const handleSetDefaultAddress = (
        isDefaultShippingAddress: AddressStatus,
        isDefaultBillingAddress: AddressStatus,
        addressId: string,
        addressToToggle: AddressModalType
    ): void => {
        if (!currentCustomer) return;
        const actions: MyCustomerUpdateAction[] = [];

        // Update default billing address
        if (isDefaultBillingAddress === AddressStatus.ON && addressToToggle === AddressModalType.BILLING) {
            actions.push({
                action: 'setDefaultBillingAddress',
                addressId,
            });
            dispatch(profileSlice.actions.setDefaultBillingAddressId({ addressId }));
        } else if (isDefaultBillingAddress === AddressStatus.OFF && addressToToggle === AddressModalType.BILLING) {
            actions.push({
                action: 'removeBillingAddressId',
                addressId,
            });
            dispatch(profileSlice.actions.setDefaultBillingAddressId({ addressId: '' }));
        }
        // Update default shipping address
        if (isDefaultShippingAddress === AddressStatus.ON && addressToToggle === AddressModalType.SHIPPING) {
            actions.push({
                action: 'setDefaultShippingAddress',
                addressId,
            });
            dispatch(profileSlice.actions.setDefaultShippingAddressId({ addressId }));
        } else if (isDefaultShippingAddress === AddressStatus.OFF && addressToToggle === AddressModalType.SHIPPING) {
            actions.push({
                action: 'removeShippingAddressId',
                addressId,
            });
            dispatch(profileSlice.actions.setDefaultShippingAddressId({ addressId: '' }));
        }

        dispatch(
            updateCurrentCustomersPersonalInfoTC({
                version: currentCustomerVersion,
                actions,
            })
        );
    };

    const handleSetStatusAddressByClick = (
        isShippingAddress: AddressStatus,
        isBillingAddress: AddressStatus,
        addressId: string,
        addressToToggle: AddressModalType
    ): void => {
        if (!currentCustomer) return;

        const actions: MyCustomerUpdateAction[] = [];
        // Update default billing address
        if (isBillingAddress === AddressStatus.ON && addressToToggle === AddressModalType.BILLING) {
            if (!currentCustomer.billingAddressIds?.includes(addressId)) {
                actions.push({
                    action: 'addBillingAddressId',
                    addressId,
                });
            }
        } else if (
            isBillingAddress === AddressStatus.OFF &&
            addressToToggle === AddressModalType.BILLING &&
            currentCustomer.billingAddressIds?.includes(addressId)
        ) {
            actions.push({
                action: 'removeBillingAddressId',
                addressId,
            });
        }
        // Update default shipping address
        if (isShippingAddress === AddressStatus.ON && addressToToggle === AddressModalType.SHIPPING) {
            if (!currentCustomer.shippingAddressIds?.includes(addressId)) {
                actions.push({
                    action: 'addShippingAddressId',
                    addressId,
                });
            }
        } else if (
            isShippingAddress === AddressStatus.OFF &&
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
                            toggleStatusAddressesCB={handleSetStatusAddressByClick}
                            toggleIsDefaultAddressesCB={handleSetDefaultAddress}
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
