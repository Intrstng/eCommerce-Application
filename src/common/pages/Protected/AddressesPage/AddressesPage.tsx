import Typography from '@mui/material/Typography';
import { STYLES } from './styles.addressesPage';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect } from 'react';
import { getCurrentCustomerTC } from '../../../../features/profile/model/slices/__tests__/profileSlice';
import { profileCustomerSelector } from '../../../../features/profile/model/selectors/profileSelector';
import type { Customer } from '@commercetools/platform-sdk';

export const AddressesPage = () => {
    const dispatch = useAppDispatch();
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    console.log('addresses', currentCustomer);

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    return (
        <Box>
            <Typography variant="h3" component="h3" sx={STYLES.addressesTitle}>
                Addresses
            </Typography>
        </Box>
    );
};
