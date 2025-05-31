import type { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { Customer } from '@commercetools/platform-sdk';
import { profileCustomerSelector } from '../../../features/profile/model/selectors/profileSelector';
import Button from '@mui/material/Button';
import { STYLES } from './styles.personalData';
import type { PersonalDataProps } from '../../pages/Protected/ProfilePage/PersonalDataPage/types';
import Skeleton from '@mui/material/Skeleton';
import { useEffect } from 'react';
import { getCurrentCustomerTC } from '../../../features/profile/model/slices/__tests__/profileSlice';

export const PersonalNotEditableData: FC<PersonalDataProps> = ({ toggleIsEditable }) => {
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    return (
        <Box>
            <Box sx={STYLES.personalNonEditableInfoContent}>
                <Box sx={STYLES.personalNonEditableInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Email:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                            ...STYLES.personalItemInfo,
                            ...STYLES.editableField,
                        }}
                    >
                        {currentCustomer && 'email' in currentCustomer ? (
                            currentCustomer.email
                        ) : (
                            <Skeleton variant="text" width="80%" height={35} />
                        )}
                    </Typography>
                </Box>

                <Box sx={STYLES.personalNonEditableInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        First Name:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                            ...STYLES.personalItemInfo,
                            ...STYLES.editableField,
                        }}
                    >
                        {currentCustomer && 'firstName' in currentCustomer ? (
                            currentCustomer.firstName
                        ) : (
                            <Skeleton variant="text" width="80%" height={35} />
                        )}
                    </Typography>
                </Box>

                <Box sx={STYLES.personalNonEditableInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Last Name:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                            ...STYLES.personalItemInfo,
                            ...STYLES.editableField,
                        }}
                    >
                        {currentCustomer && 'lastName' in currentCustomer ? (
                            currentCustomer.lastName
                        ) : (
                            <Skeleton variant="text" width="80%" height={35} />
                        )}
                    </Typography>
                </Box>

                <Box sx={STYLES.personalNonEditableInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Date of Birth:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                            ...STYLES.personalItemInfo,
                            ...STYLES.editableField,
                        }}
                    >
                        {currentCustomer && 'dateOfBirth' in currentCustomer ? (
                            currentCustomer.dateOfBirth
                        ) : (
                            <Skeleton variant="text" width="80%" height={35} />
                        )}
                    </Typography>
                </Box>
            </Box>

            <Button
                sx={{
                    ...STYLES.editButton,
                    ...STYLES.saveButton,
                }}
                type="button"
                variant="contained"
                color="info"
                onClick={() => {
                    toggleIsEditable(true);
                }}
            >
                Edit profile
            </Button>
        </Box>
    );
};
