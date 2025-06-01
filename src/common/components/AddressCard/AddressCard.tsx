import Box from '@mui/material/Box';
import { STYLES } from './styles.addressCard';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';
import { useEffect } from 'react';
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

export const AddressCard: FC<AddressCardProps> = ({ address }) => {
    const dispatch = useAppDispatch();
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    const appStatus: string = useAppSelector<Status>(statusSelector);

    const currentCountry: Country | undefined = COUNTRIES.find(country => country.code === address?.country);

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
                        // onClick={cancelEditChangesHandler}
                        disabled={appStatus === 'loading'}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        sx={STYLES.deleteAddressButton}
                        type="button"
                        // onClick={cancelEditChangesHandler}
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
                                ...STYLES.billingPurposeButton,
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            // onClick={cancelEditChangesHandler}
                            disabled={appStatus === 'loading'}
                        >
                            as for billing
                        </Button>
                        <Button
                            sx={{
                                ...STYLES.addressDetailsButton,
                                ...STYLES.shippingPurposeButton,
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            // onClick={cancelEditChangesHandler}
                            disabled={appStatus === 'loading'}
                        >
                            as for shipping
                        </Button>
                    </Box>

                    <Box sx={STYLES.addressStatusButtons}>
                        <Button
                            sx={{
                                ...STYLES.addressDetailsButton,
                                ...STYLES.defaultBillingStatusButton,
                                ...(currentAddressData.isDefaultBilling ? STYLES.statusActive : {}),
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            // onClick={cancelEditChangesHandler}
                            disabled={appStatus === 'loading'}
                        >
                            default billing
                        </Button>
                        <Button
                            sx={{
                                ...STYLES.addressDetailsButton,
                                ...STYLES.defaultShippingStatusButton,
                                ...(currentAddressData.isDefaultShipping ? STYLES.statusActive : {}),
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            // onClick={cancelEditChangesHandler}
                            disabled={appStatus === 'loading'}
                        >
                            default shipping
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
