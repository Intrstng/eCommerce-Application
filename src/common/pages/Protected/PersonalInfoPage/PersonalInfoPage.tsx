import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CustomButton } from '../../../buttons/CustomButton';
import { STYLES } from './styles.personalInfoPage';
import S from './PersonalInfoPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import type { Customer } from '@commercetools/platform-sdk';
import { profileCustomerSelector } from '../../../../features/profile/model/selectors/profileSelector';
import { useEffect } from 'react';
import { getCurrentCustomerTC } from '../../../../features/profile/model/slices/__tests__/profileSlice';

export const PersonalInfoPage = () => {
    const dispatch = useAppDispatch();
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);

    const firstName: string | undefined = currentCustomer?.firstName;
    const lastName: string | undefined = currentCustomer?.lastName;
    const email: string | undefined = currentCustomer?.email;
    const dateOfBirth: string | undefined = currentCustomer?.dateOfBirth;

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    return (
        <Box>
            <Typography variant="h3" component="h3" sx={STYLES.personalTitle}>
                Your Information
            </Typography>

            <Box sx={STYLES.personalInfoContent}>
                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Email:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        {email}
                    </Typography>
                </Box>

                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        First Name:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        {firstName}
                    </Typography>
                </Box>

                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Last Name:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        {lastName}
                    </Typography>
                </Box>

                <Box sx={STYLES.personalInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Date of Birth:
                    </Typography>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemInfo}>
                        {dateOfBirth}
                    </Typography>
                </Box>
            </Box>

            <CustomButton className={S.editButton}>Edit profile</CustomButton>
        </Box>
    );
};
