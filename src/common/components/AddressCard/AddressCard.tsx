import Box from '@mui/material/Box';
import { STYLES } from './styles.addressCard';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { getCurrentCustomerTC } from '../../../features/profile/model/slices/__tests__/profileSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import type { Customer } from '@commercetools/platform-sdk';
import {
    profileCustomerSelector,
    profileDefaultBillingAddressIdSelector,
    profileDefaultShippingAddressIdSelector,
} from '../../../features/profile/model/selectors/profileSelector';
import type { EditAddressData } from '../../types';
import type { AddressCardProps } from './types';
import type { Country } from '../../validations/validation-data/validation-data';
import { COUNTRIES } from '../../validations/validation-data/validation-data';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { DeleteAddressModal } from '../ModalWindow/DeleteAddressModal/DeleteAddressModal';
import Dialog from '@mui/material/Dialog';
import { EditAddressModalForm } from '../ModalWindow/EditAddressModalForm/EditAddressModalForm';
import { AddressModalType, AddressStatus } from '../../enums';
import Tooltip from '@mui/material/Tooltip';

export const AddressCard: FC<AddressCardProps> = ({
    address,
    deleteAddressCB,
    editAddressCB,
    toggleStatusAddressesCB,
    toggleIsDefaultAddressesCB,
    shippingAddressIds,
    billingAddressIds,
}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [addressToDeleteId, setAddressToDeleteId] = useState<string>('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    const currentDefaultShippingAddressId = useAppSelector<string>(profileDefaultShippingAddressIdSelector);
    const currentDefaultBillingAddressId = useAppSelector<string>(profileDefaultBillingAddressIdSelector);
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const dispatch = useAppDispatch();

    const defaultShippingAddressId: string | undefined =
        currentCustomer && 'defaultShippingAddressId' in currentCustomer
            ? currentCustomer.defaultShippingAddressId
            : '';
    const defaultBillingAddressId: string | undefined =
        currentCustomer && 'defaultBillingAddressId' in currentCustomer ? currentCustomer.defaultBillingAddressId : '';

    const currentCountry: Country | undefined = COUNTRIES.find(country => country.code === address?.country);
    let isShippingAddress: AddressStatus = AddressStatus.OFF;
    let isBillingAddress: AddressStatus = AddressStatus.OFF;

    let isDefaultShippingAddress: AddressStatus = AddressStatus.OFF;
    let isDefaultBillingAddress: AddressStatus = AddressStatus.OFF;

    if (address.id) {
        isShippingAddress = shippingAddressIds.includes(address.id) ? AddressStatus.ON : AddressStatus.OFF;
        isBillingAddress = billingAddressIds.includes(address.id) ? AddressStatus.ON : AddressStatus.OFF;

        isDefaultShippingAddress = defaultShippingAddressId === address.id ? AddressStatus.ON : AddressStatus.OFF;
        isDefaultBillingAddress = defaultBillingAddressId === address.id ? AddressStatus.ON : AddressStatus.OFF;
    }

    const [isShipping, setIsShipping] = useState(isShippingAddress);
    const [isBilling, setIsBilling] = useState(isBillingAddress);
    // const [isDefaultShipping, setIsDefaultShipping] = useState(isDefaultShippingAddress); // Todo: check is needed in code in Sprint 4
    // const [isDefaultBilling, setIsDefaultBilling] = useState(isDefaultBillingAddress); // Todo: check is needed in code in Sprint 4

    const currentAddressData: EditAddressData = {
        streetName: address?.streetName ?? '',
        city: address?.city ?? '',
        postalCode: address?.postalCode ?? '',
        country: address?.country ?? '',
    };

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    const handleIconDeleteClick = (addressId?: string) => {
        if (!addressId) return;
        setAddressToDeleteId(addressId);
        setOpenDeleteDialog(true);
    };

    const handleModalConfirmDelete = () => {
        if (addressToDeleteId) {
            deleteAddressCB(addressToDeleteId);
        }
        setOpenDeleteDialog(false);
    };

    const handleModalCancelDelete = () => {
        setOpenDeleteDialog(false);
        setAddressToDeleteId('');
    };

    const handleToggleIsShipping = () => {
        const newIsShippingStatus = isShipping === AddressStatus.ON ? AddressStatus.OFF : AddressStatus.ON;
        setIsShipping(newIsShippingStatus);
        if (address.id) {
            toggleStatusAddressesCB(newIsShippingStatus, isBilling, address.id, AddressModalType.SHIPPING);
        }
    };

    const handleToggleIsBilling = () => {
        const newIsBillingStatus = isBilling === AddressStatus.ON ? AddressStatus.OFF : AddressStatus.ON;
        setIsBilling(newIsBillingStatus);
        if (address.id) {
            toggleStatusAddressesCB(isShipping, newIsBillingStatus, address.id, AddressModalType.BILLING);
        }
    };

    const handleToggleDefaultShipping = () => {
        const newDefaultShippingStatus =
            isDefaultShippingAddress === AddressStatus.ON ? AddressStatus.OFF : AddressStatus.ON;
        // setIsDefaultShipping(newDefaultShippingStatus); // Todo: check is needed in code in Sprint 4
        if (address.id) {
            toggleIsDefaultAddressesCB(
                newDefaultShippingStatus,
                isDefaultBillingAddress,
                address.id,
                AddressModalType.SHIPPING
            );
        }
    };

    const handleToggleDefaultBilling = () => {
        const newDefaultBillingStatus =
            isDefaultBillingAddress === AddressStatus.ON ? AddressStatus.OFF : AddressStatus.ON;
        // setIsDefaultBilling(newDefaultBillingStatus); // Todo: check is needed in code in Sprint 4
        if (address.id) {
            toggleIsDefaultAddressesCB(
                isDefaultShippingAddress,
                newDefaultBillingStatus,
                address.id,
                AddressModalType.BILLING
            );
        }
    };

    return (
        <Box sx={STYLES.addressCardInfoContent}>
            <Box sx={{ mt: 2 }} >
                <Box sx={STYLES.addressCardInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardInfoTitle}>
                        Country:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardItemInfo}>
                        {appStatus === 'loading' || !currentCountry?.name ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            currentCountry.name
                        )}
                    </Typography>
                </Box>

                <Box sx={STYLES.addressCardInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardInfoTitle}>
                        City:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardItemInfo}>
                        {appStatus === 'loading' || !currentAddressData.city ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            currentAddressData.city
                        )}
                    </Typography>
                </Box>

                <Box sx={STYLES.addressCardInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardInfoTitle}>
                        Address:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardItemInfo}>
                        {appStatus === 'loading' || !currentAddressData.streetName ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            currentAddressData.streetName
                        )}
                    </Typography>
                </Box>

                <Box sx={STYLES.addressCardInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardInfoTitle}>
                        Postal code:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.addressCardItemInfo}>
                        {appStatus === 'loading' || !currentAddressData.postalCode ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            currentAddressData.postalCode
                        )}
                    </Typography>
                </Box>
            </Box>

            <Box sx={STYLES.addressControls}>
                <Box sx={STYLES.addressEditControls}>
                    <IconButton
                        sx={STYLES.editAddressButton}
                        type="button"
                        onClick={() => {
                            setOpenEditModal(true);
                        }}
                        disabled={appStatus === 'loading'}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        sx={STYLES.deleteAddressButton}
                        type="button"
                        onClick={() => {
                            handleIconDeleteClick(address.id);
                        }}
                        disabled={appStatus === 'loading'}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>

                <Box sx={STYLES.addressDetailsControls}>
                    <Box sx={STYLES.addressPurposeButtons}>
                        <Button
                            sx={{
                                ...STYLES.addressDetailsButton,
                                ...STYLES.shippingPurposeButton,
                                ...(isShipping === AddressStatus.ON ? STYLES.purposeActive : {}),
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            onClick={handleToggleIsShipping}
                            disabled={appStatus === 'loading'}
                        >
                            as for shipping
                        </Button>

                        <Button
                            sx={{
                                ...STYLES.addressDetailsButton,
                                ...STYLES.billingPurposeButton,
                                ...(isBilling === AddressStatus.ON ? STYLES.purposeActive : {}),
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            onClick={handleToggleIsBilling}
                            disabled={appStatus === 'loading'}
                        >
                            as for billing
                        </Button>
                    </Box>
                </Box>

                <Box sx={STYLES.addressDefaultControls}>
                    <Box sx={STYLES.addressDefaultButtons}>
                        <Tooltip
                            title={
                                isShipping === AddressStatus.OFF
                                    ? 'At first set this address as the shipping address'
                                    : ''
                            }
                            placement="right"
                            arrow
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        fontSize: '0.8rem',
                                        bgcolor: 'grey.800',
                                    },
                                },
                                arrow: {
                                    sx: {
                                        color: 'grey.800',
                                    },
                                },
                            }}
                        >
                            <Box component="span" sx={STYLES.tooltipDefaultButton}>
                                <Button
                                    sx={{
                                        ...STYLES.addressDefaultButton,
                                        ...STYLES.shippingDefaultButton,
                                        ...(currentDefaultShippingAddressId === address.id &&
                                        isShipping === AddressStatus.ON
                                            ? STYLES.statusActive
                                            : {}),
                                    }}
                                    type="button"
                                    variant="contained"
                                    color="info"
                                    onClick={handleToggleDefaultShipping}
                                    disabled={appStatus === 'loading' || isShipping === AddressStatus.OFF}
                                >
                                    Default for shipping
                                </Button>
                            </Box>
                        </Tooltip>

                        <Tooltip
                            title={
                                isBilling === AddressStatus.OFF
                                    ? 'At first set this address as the billing address'
                                    : ''
                            }
                            placement="right"
                            arrow
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        fontSize: '0.8rem',
                                        bgcolor: 'grey.800',
                                    },
                                },
                                arrow: {
                                    sx: {
                                        color: 'grey.800',
                                    },
                                },
                            }}
                        >
                            <Box component="span" sx={STYLES.tooltipDefaultButton}>
                                <Button
                                    sx={{
                                        ...STYLES.addressDefaultButton,
                                        ...STYLES.billingDefaultButton,
                                        ...(currentDefaultBillingAddressId === address.id &&
                                        isBilling === AddressStatus.ON
                                            ? STYLES.statusActive
                                            : {}),
                                    }}
                                    type="button"
                                    variant="contained"
                                    color="info"
                                    onClick={handleToggleDefaultBilling}
                                    disabled={appStatus === 'loading' || isBilling === AddressStatus.OFF}
                                >
                                    Default for billing
                                </Button>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

            <DeleteAddressModal
                isOpen={openDeleteDialog}
                modalCancelDeleteCB={handleModalCancelDelete}
                modalConfirmDeleteCB={handleModalConfirmDelete}
            />

            <Dialog
                open={openEditModal}
                onClose={() => {
                    setOpenEditModal(false);
                }}
                sx={STYLES.dialog}
            >
                <EditAddressModalForm
                    addressId={address.id ?? ''}
                    closeModalCB={() => {
                        setOpenEditModal(false);
                    }}
                    editAddressCB={editAddressCB}
                />
            </Dialog>
        </Box>
    );
};
