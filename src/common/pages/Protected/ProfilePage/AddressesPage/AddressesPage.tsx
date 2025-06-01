import Typography from '@mui/material/Typography';
import { STYLES } from './styles.addressesPage';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect } from 'react';
import { getCurrentCustomerTC } from '../../../../../features/profile/model/slices/__tests__/profileSlice';
import { profileCustomerSelector } from '../../../../../features/profile/model/selectors/profileSelector';
import type { Address, Customer } from '@commercetools/platform-sdk';
import Button from '@mui/material/Button';
import { statusSelector } from 'app/model/selectors/appSelectors';
import type { Status } from 'app/model/types';
import { AddressCard } from '../../../../components/AddressCard/AddressCard';

export const AddressesPage = () => {
    const dispatch = useAppDispatch();
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);

    const currentAddresses: Address[] =
        currentCustomer && 'addresses' in currentCustomer ? currentCustomer.addresses : [];

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    return (
        <Box sx={STYLES.addressCardsContent}>
            <Typography variant="h3" component="h3" sx={STYLES.addressesTitle}>
                Addresses
            </Typography>

            <Box sx={STYLES.addressCards}>
                {currentAddresses.map(address => (
                    <AddressCard key={address.id} address={address} />
                ))}
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
                    // onClick={cancelEditChangesHandler}
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
                    // onClick={cancelEditChangesHandler}
                    disabled={appStatus === 'loading'}
                >
                    Add new shipping address
                </Button>
            </Box>
        </Box>
    );
};
