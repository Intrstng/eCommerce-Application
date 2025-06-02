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
import { profileCustomerSelector } from '../../../features/profile/model/selectors/profileSelector';
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
import { AddressModalType, DefaultAddressStatus } from '../../enums';


export const AddressCard: FC<AddressCardProps> = ({
    address,
    deleteAddressCB,
    editAddressCB,
    toggleDefaultAddressesCB,
    shippingAddressIds,
    billingAddressIds,
}) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [addressToDeleteId, setAddressToDeleteId] = useState<string>('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const dispatch = useAppDispatch();

    const currentCountry: Country | undefined = COUNTRIES.find(country => country.code === address?.country);
    let isDefaultShippingAddress: DefaultAddressStatus = DefaultAddressStatus.OFF;
    let isDefaultBillingAddress: DefaultAddressStatus = DefaultAddressStatus.OFF;

    if (address.id != null) {
        isDefaultShippingAddress = shippingAddressIds.includes(address.id)
            ? DefaultAddressStatus.ON
            : DefaultAddressStatus.OFF;
        isDefaultBillingAddress = billingAddressIds.includes(address.id)
            ? DefaultAddressStatus.ON
            : DefaultAddressStatus.OFF;
    }

    const [isDefaultShipping, setIsDefaultShipping] = useState(isDefaultShippingAddress);
    const [isDefaultBilling, setIsDefaultBilling] = useState(isDefaultBillingAddress);

    const currentAddressData: EditAddressData = {
        streetName: address?.streetName ?? '',
        city: address?.city ?? '',
        postalCode: address?.postalCode ?? '',
        country: address?.country ?? '',
        isDefaultBilling: currentCustomer?.billingAddressIds?.includes(address.id ?? '') ?? false,
        isDefaultShipping: currentCustomer?.shippingAddressIds?.includes(address.id ?? '') ?? false,
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

    const handleToggleDefaultBilling = () => {
        const newDefaultBillingStatus =
            isDefaultBilling === DefaultAddressStatus.ON
                                ? DefaultAddressStatus.OFF
                                : DefaultAddressStatus.ON;
        setIsDefaultBilling(newDefaultBillingStatus);
        if (address.id) {
            console.log(
                'sent from AddressCard: isDefaultShipping, newDefaultBillingStatus',
                isDefaultShipping,
                newDefaultBillingStatus
            );
            toggleDefaultAddressesCB(isDefaultShipping, newDefaultBillingStatus, address.id, AddressModalType.BILLING);
        }
    };

    const handleToggleDefaultShipping = () => {
        const newDefaultShippingStatus =
            isDefaultShipping === DefaultAddressStatus.ON
                                ? DefaultAddressStatus.OFF
                                : DefaultAddressStatus.ON;
        setIsDefaultShipping(newDefaultShippingStatus);
        if (address.id) {
            console.log(
                'sent from AddressCard: newDefaultShippingStatus, isDefaultBilling',
                newDefaultShippingStatus,
                isDefaultBilling
            );
            toggleDefaultAddressesCB(newDefaultShippingStatus, isDefaultBilling, address.id, AddressModalType.SHIPPING);
        }
    };

    return (
        <Box sx={STYLES.addressCardInfoContent}>
            <Box>
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
                                ...(isDefaultShipping === DefaultAddressStatus.ON ? STYLES.statusActive : {}),
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            onClick={handleToggleDefaultShipping}
                            disabled={appStatus === 'loading'}
                        >
                            as for shipping
                        </Button>

                        <Button
                            sx={{
                                ...STYLES.addressDetailsButton,
                                ...STYLES.billingPurposeButton,
                                ...(isDefaultBilling === DefaultAddressStatus.ON ? STYLES.statusActive : {}),
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            onClick={handleToggleDefaultBilling}
                            disabled={appStatus === 'loading'}
                        >
                            as for billing
                        </Button>
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
