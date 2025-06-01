import type { EditPersonalData } from '../../validations/editPersonalDataValidation.schema';
import { validateEditPersonalDataSchema } from '../../validations/editPersonalDataValidation.schema';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { STYLES } from './styles.personalData';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import Button from '@mui/material/Button';
import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { profileCustomerSelector } from '../../../features/profile/model/selectors/profileSelector';
import type { PersonalDataProps } from '../../pages/Protected/ProfilePage/PersonalDataPage/types';
import FormGroup from '@mui/material/FormGroup';
import { FormControl } from '@mui/material';
import {
    getCurrentCustomerTC,
    updateCurrentCustomersPersonalInfoTC,
} from '../../../features/profile/model/slices/__tests__/profileSlice';
import { useEffect } from 'react';

export const PersonalEditableData: FC<PersonalDataProps> = ({ toggleIsEditable }) => {
    const currentCustomer = useAppSelector<Customer | null>(profileCustomerSelector);
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const dispatch = useAppDispatch();

    let currentCustomerVersion: number;

    const emailDefaultValue = currentCustomer && 'email' in currentCustomer ? currentCustomer.email : '';
    const firstNameDefaultValue = currentCustomer && 'firstName' in currentCustomer ? currentCustomer.firstName : '';
    const lastNameDefaultValue = currentCustomer && 'lastName' in currentCustomer ? currentCustomer.lastName : '';
    const dateOfBirthDefaultValue =
        currentCustomer && 'dateOfBirth' in currentCustomer ? currentCustomer.dateOfBirth : '';

    if (currentCustomer && 'version' in currentCustomer) {
        currentCustomerVersion = currentCustomer.version;
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(validateEditPersonalDataSchema()),
    });

    const cancelEditChangesHandler = () => {
        toggleIsEditable(false);
    };

    const onSubmit: SubmitHandler<EditPersonalData> = data => {
        const actions: MyCustomerUpdateAction[] = [];

        if (data.email) {
            actions.push({
                action: 'changeEmail',
                email: data.email,
            });
        }

        if (data.firstName) {
            actions.push({
                action: 'setFirstName',
                firstName: data.firstName,
            });
        }

        if (data.lastName) {
            actions.push({
                action: 'setLastName',
                lastName: data.lastName,
            });
        }

        if (data.birthDate) {
            actions.push({
                action: 'setDateOfBirth',
                dateOfBirth: data.birthDate,
            });
        }

        if (actions.length > 0) {
            dispatch(
                updateCurrentCustomersPersonalInfoTC({
                    version: currentCustomerVersion,
                    actions,
                })
            );
        }

        //reset();
        toggleIsEditable(false);
    };

    useEffect(() => {
        dispatch(getCurrentCustomerTC());
    }, [dispatch]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup sx={STYLES.personalEditableInfoContent}>
                <FormControl fullWidth sx={STYLES.personalEditableInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Email:
                    </Typography>
                    <TextField
                        hiddenLabel
                        defaultValue={emailDefaultValue}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="emailProfile"
                        error={!!errors.email}
                        {...register('email')}
                        autoComplete="email"
                        sx={STYLES.personalItemInfo}
                    />
                    {errors.email && (
                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                            {errors.email.message}
                        </Typography>
                    )}
                </FormControl>

                <FormControl fullWidth sx={STYLES.personalEditableInfo}>
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        First Name:
                    </Typography>
                    <TextField
                        hiddenLabel
                        defaultValue={firstNameDefaultValue}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="firstNameProfile"
                        error={!!errors.firstName}
                        {...register('firstName')}
                        autoComplete="given-name"
                        sx={STYLES.personalItemInfo}
                    />
                    {errors.firstName && (
                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                            {errors.firstName.message}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    sx={{
                        ...STYLES.personalEditableInfo,
                        ...STYLES.lastNameControl,
                    }}
                >
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Last Name:
                    </Typography>
                    <TextField
                        hiddenLabel
                        defaultValue={lastNameDefaultValue}
                        type="text"
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="lastNameProfile"
                        error={!!errors.lastName}
                        {...register('lastName')}
                        autoComplete="given-name"
                        sx={STYLES.personalItemInfo}
                    />
                    {errors.lastName && (
                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                            {errors.lastName.message}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    sx={{
                        ...STYLES.personalEditableInfo,
                        ...STYLES.birthControl,
                    }}
                >
                    <Typography variant="h5" component="h5" sx={STYLES.personalItemTitle}>
                        Date of Birth:
                    </Typography>
                    <TextField
                        hiddenLabel
                        defaultValue={dateOfBirthDefaultValue}
                        type="date"
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="birthDateProfile"
                        error={!!errors.birthDate}
                        {...register('birthDate')}
                        sx={{
                            ...STYLES.personalItemInfo,
                            ...STYLES.dateInput,
                        }}
                    />
                    {errors.birthDate && (
                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                            {errors.birthDate.message}
                        </Typography>
                    )}
                </FormControl>

                <Box sx={STYLES.editControls}>
                    <Button
                        sx={{
                            ...STYLES.editButton,
                            ...STYLES.cancelButton,
                        }}
                        type="button"
                        variant="contained"
                        color="info"
                        onClick={cancelEditChangesHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            ...STYLES.editButton,
                            ...STYLES.saveButton,
                        }}
                        type="submit"
                        variant="contained"
                        color="info"
                        disabled={!isValid || appStatus === 'loading'}
                    >
                        Save changes
                    </Button>
                </Box>
            </FormGroup>
        </Box>
    );
};
