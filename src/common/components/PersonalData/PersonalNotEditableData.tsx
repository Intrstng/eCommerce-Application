import type { FC } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { Customer } from '@commercetools/platform-sdk';
import { profileCustomerSelector } from '../../../features/profile/model/selectors/profileSelector';
import Button from '@mui/material/Button';
import { STYLES } from './styles.personalData';
import type { PersonalDataProps } from '../../pages/Protected/ProfilePage/PersonalDataPage/types';
import Skeleton from '@mui/material/Skeleton';
import { getCurrentCustomerTC } from '../../../features/profile/model/slices/__tests__/profileSlice';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';

export const PersonalNotEditableData: FC<PersonalDataProps> = ({ toggleIsEditable }) => {
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const dispatch = useAppDispatch();

    const emailValue = currentCustomer && 'email' in currentCustomer ? currentCustomer.email : '';
    const firstNameValue = currentCustomer && 'firstName' in currentCustomer ? currentCustomer.firstName : '';
    const lastNameValue = currentCustomer && 'lastName' in currentCustomer ? currentCustomer.lastName : '';
    const dateOfBirthValue = currentCustomer && 'dateOfBirth' in currentCustomer ? currentCustomer.dateOfBirth : '';

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
                        {appStatus === 'loading' || !emailValue ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            emailValue
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
                        {appStatus === 'loading' || !firstNameValue ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            firstNameValue
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
                        {appStatus === 'loading' || !lastNameValue ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            lastNameValue
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
                        {appStatus === 'loading' || !dateOfBirthValue ? (
                            <Skeleton variant="text" width="80%" height={35} />
                        ) : (
                            dateOfBirthValue
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
