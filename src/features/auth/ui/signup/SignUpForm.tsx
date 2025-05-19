import { useEffect, useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FilledInput } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.signUpForm';
import { COUNTRIES } from '../../../../common/validations/validation-data/validation-data';
import { PATH } from '../../../../common/enums';
import type { SignUpFormData } from '../../../../common/validations/signUpValidation.shema';
import { validateSignUpSchema } from '../../../../common/validations/signUpValidation.shema';
import { onMouseDownConfirmPassword, onMouseDownPassword } from '../../utils/auth-handlers';
import { AuthFormLink } from '../../../../common/components/AuthFormLink/AuthFormLink';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import type { Address, User } from '../../../../common/types';
import { signUpTC } from '../../model/slices/authSlice';

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const appStatus = useAppSelector<Status>(statusSelector);
    const dispatch = useAppDispatch();

    const passwordInputReference = useRef<HTMLInputElement | null>(null);

    const onClickShowPassword = () => {
        setShowPassword(show => !show);
    };

    const onClickShowConfirmPassword = () => {
        setShowConfirmPassword(show => !show);
    };

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isValid },
        setValue,
        getValues,
    } = useForm({
        // useForm<SignUpFormData>({
        mode: 'all',
        resolver: yupResolver(validateSignUpSchema()),
        defaultValues: {
            countryShipping: '',
            countryBilling: '',
            isDefaultShippingAddress: false,
            isBillingSameAsShipping: false,
            isDefaultBillingAddress: false,
        },
    });

    const onSubmit: SubmitHandler<SignUpFormData> = data => {
        const shippingAddress: Address = {
            streetName: data.streetShipping,
            city: data.cityShipping,
            country: data.countryShipping,
            postalCode: data.postalShipping,
        };

        const addresses: Address[] = [shippingAddress];
        const defaultShippingAddress = data.isDefaultShippingAddress ? 0 : undefined;
        let defaultBillingAddress: number | undefined;
        const shippingAddresses: number[] = [0];
        let billingAddresses: number[] = [];

        if (data.isBillingSameAsShipping) {
            billingAddresses = [0];
            if (data.isDefaultBillingAddress) {
                defaultBillingAddress = 0;
            }
        } else if (data.streetBilling && data.cityBilling && data.countryBilling && data.postalBilling) {
            const billingAddressData: Address = {
                streetName: data.streetBilling,
                city: data.cityBilling,
                country: data.countryBilling,
                postalCode: data.postalBilling,
            };
            addresses.push(billingAddressData);
            billingAddresses = [1];
            if (data.isDefaultBillingAddress) {
                defaultBillingAddress = 1;
            }
        }

        const newUser: User = {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.birthDate,
            addresses,
            defaultShippingAddress,
            defaultBillingAddress,
            shippingAddresses,
            billingAddresses,
        };

        dispatch(signUpTC(newUser));

        setValue('isDefaultShippingAddress', false);
        setValue('isBillingSameAsShipping', false);
        setValue('isDefaultBillingAddress', false);
        reset();
    };

    const selectedCountryShipping = useWatch({
        control,
        name: 'countryShipping',
    });

    const selectedCountryBilling = useWatch({
        control,
        name: 'countryBilling',
    });

    const isSameBillingAddress = useWatch({
        control,
        name: 'isBillingSameAsShipping',
    });

    useEffect(() => {
        if (isSameBillingAddress) {
            setValue('streetBilling', getValues('streetShipping'));
            setValue('cityBilling', getValues('cityShipping'));
            setValue('countryBilling', getValues('countryShipping'));
            setValue('postalBilling', getValues('postalShipping'));
        }
    }, [isSameBillingAddress, getValues, setValue]);

    return (
        <Container component="main" maxWidth="xl">
            <Box sx={STYLES.content}>
                <Avatar sx={STYLES.logo} variant="rounded">
                    <HowToRegIcon />
                </Avatar>
                <Typography sx={STYLES.pageTitle} component="h2" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup>
                        <Box>
                            <Typography variant="subtitle1" component="h6">
                                Email and Password
                            </Typography>
                            <Box sx={STYLES.formPass}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        id="emailSignUp"
                                        error={!!errors.email}
                                        variant="filled"
                                        sx={{
                                            ...STYLES.emailInput,
                                            ...STYLES.autofillInput
                                        }}
                                        {...register('email')}
                                        autoComplete="email"
                                        size="small"
                                    />
                                    {errors.email && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.email.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl variant="filled" size="small" error={!!errors.password} fullWidth>
                                    <InputLabel htmlFor="passwordSignUp">Password</InputLabel>
                                    <FilledInput
                                        id="passwordSignUp"
                                        type={showPassword ? 'text' : 'password'}
                                        sx={STYLES.passInput}
                                        {...register('password')}
                                        autoComplete="new-password"
                                        inputRef={passwordInputReference}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={onClickShowPassword}
                                                    onMouseDown={onMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    {errors.password && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.password.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl variant="filled" size="small" error={!!errors.confirmPassword} fullWidth>
                                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                                    <FilledInput
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...register('confirmPassword')}
                                        autoComplete="new-password"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirmPassword visibility"
                                                    onClick={onClickShowConfirmPassword}
                                                    onMouseDown={onMouseDownConfirmPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm password"
                                    />
                                    {errors.confirmPassword && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.confirmPassword.message}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" component="h6">
                                Personal information
                            </Typography>

                            <Box sx={STYLES.formName}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="First name"
                                        type="text"
                                        fullWidth
                                        id="firstName"
                                        error={!!errors.firstName}
                                        variant="filled"
                                        sx={{
                                            ...STYLES.nameInput,
                                            ...STYLES.autofillInput
                                        }}
                                        {...register('firstName')}
                                        autoComplete="given-name"
                                        size="small"
                                    />
                                    {errors.firstName && (
                                        <Typography
                                            component="h2"
                                            variant="body2"
                                            sx={{ ...STYLES.errorForm, ...STYLES.errorName }}
                                        >
                                            {errors.firstName.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        id="lastName"
                                        error={!!errors.lastName}
                                        variant="filled"
                                        sx={{
                                            ...STYLES.nameInput,
                                            ...STYLES.autofillInput
                                        }}
                                        {...register('lastName')}
                                        autoComplete="family-name"
                                        size="small"
                                    />
                                    {errors.lastName && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.lastName.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label=""
                                        type="date"
                                        fullWidth
                                        id="birthDate"
                                        error={!!errors.birthDate}
                                        variant="filled"
                                        sx={{
                                            ...STYLES.dateInput,
                                            '& .MuiInputBase-input': {
                                                padding: '0.75rem',
                                            },
                                        }}
                                        {...register('birthDate')}
                                        size="small"
                                    />
                                    {errors.birthDate && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.birthDate.message}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" component="h6">
                                Shipping address
                            </Typography>
                            <Box sx={STYLES.formShipping}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Street"
                                        type="text"
                                        fullWidth
                                        id="streetShipping"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.addressInputMedia,
                                            ...STYLES.autofillInput
                                        }}
                                        error={!!errors.streetShipping}
                                        variant="filled"
                                        {...register('streetShipping')}
                                        autoComplete="street-address"
                                        size="small"
                                    />
                                    {errors.streetShipping && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.streetShipping.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label="City"
                                        type="text"
                                        fullWidth
                                        id="cityShipping"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.addressInputMedia,
                                            ...STYLES.autofillInput
                                        }}
                                        error={!!errors.cityShipping}
                                        variant="filled"
                                        {...register('cityShipping')}
                                        autoComplete="address-level2"
                                        size="small"
                                    />
                                    {errors.cityShipping && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.cityShipping.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth variant="filled">
                                    <InputLabel id="country-label" sx={STYLES.countryLabel}>
                                        Country
                                    </InputLabel>
                                    <Select
                                        labelId="country-label"
                                        id="countryShipping"
                                        label="Country"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.countryInput,
                                            ...STYLES.addressInputMedia,
                                        }}
                                        error={!!errors.countryShipping}
                                        {...register('countryShipping')}
                                        size="small"
                                        value={selectedCountryShipping ?? ''}
                                    >
                                        {COUNTRIES.map(country => (
                                            <MenuItem key={country.code} value={country.code}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.countryShipping && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.countryShipping.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label={selectedCountryShipping ? 'Postal code' : 'Select a country first'}
                                        type="text"
                                        fullWidth
                                        id="postalShipping"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.addressInputMedia,
                                        }}
                                        error={!!errors.postalShipping}
                                        variant="filled"
                                        {...register('postalShipping')}
                                        autoComplete="postal-code"
                                        size="small"
                                        disabled={!selectedCountryShipping}
                                    />
                                    {errors.postalShipping && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.postalShipping.message}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            id="defaultShippingAddress"
                                            {...register('isDefaultShippingAddress')}
                                        />
                                    }
                                    label="Set address as default for shipping"
                                    sx={STYLES.defaultShippingAddressCheckbox}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            id="billingSameAsShipping"
                                            {...register('isBillingSameAsShipping')}
                                        />
                                    }
                                    label="Set shipping address as billing"
                                    sx={STYLES.shippingAsBillingCheckbox}
                                />
                            </FormGroup>
                        </Box>

                        <Box>
                            {isSameBillingAddress ? (
                                <Typography variant="body2" sx={STYLES.shippingAsBillingMessage}>
                                    Using shipping address as billing address
                                </Typography>
                            ) : (
                                <Box sx={STYLES.containerBilling}>
                                    <Typography variant="subtitle1" component="h6">
                                        Billing address
                                    </Typography>
                                    <Box sx={STYLES.formBilling}>
                                        <FormControl fullWidth variant="filled">
                                            <TextField
                                                label="Street"
                                                type="text"
                                                fullWidth
                                                id="streetBilling"
                                                sx={{
                                                    ...STYLES.addressInput,
                                                    ...STYLES.addressInputMedia,
                                                    ...STYLES.autofillInput
                                                }}
                                                error={!!errors.streetBilling}
                                                variant="filled"
                                                {...register('streetBilling')}
                                                autoComplete="street-address"
                                                size="small"
                                            />
                                            {errors.streetBilling && (
                                                <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                                    {errors.streetBilling.message}
                                                </Typography>
                                            )}
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="City"
                                                type="text"
                                                fullWidth
                                                id="cityBilling"
                                                sx={{
                                                    ...STYLES.addressInput,
                                                    ...STYLES.addressInputMedia,
                                                    ...STYLES.autofillInput
                                                }}
                                                error={!!errors.cityBilling}
                                                variant="filled"
                                                {...register('cityBilling')}
                                                autoComplete="address-level2"
                                                size="small"
                                            />
                                            {errors.cityBilling && (
                                                <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                                    {errors.cityBilling.message}
                                                </Typography>
                                            )}
                                        </FormControl>

                                        <FormControl fullWidth variant="filled">
                                            <InputLabel id="country-label" sx={STYLES.countryLabel}>
                                                Country
                                            </InputLabel>
                                            <Select
                                                labelId="country-label"
                                                id="countryBilling"
                                                label="Country"
                                                sx={{
                                                    ...STYLES.addressInput,
                                                    ...STYLES.countryInput,
                                                    ...STYLES.addressInputMedia,
                                                }}
                                                error={!!errors.countryBilling}
                                                {...register('countryBilling')}
                                                size="small"
                                                value={selectedCountryBilling ?? ''}
                                            >
                                                {COUNTRIES.map(country => (
                                                    <MenuItem key={country.code} value={country.code}>
                                                        {country.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.countryBilling && (
                                                <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                                    {errors.countryBilling.message}
                                                </Typography>
                                            )}
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                label={
                                                    selectedCountryBilling ? 'Postal code' : 'Select a country first'
                                                }
                                                type="text"
                                                fullWidth
                                                id="postalBilling"
                                                sx={{ ...STYLES.addressInput, ...STYLES.addressInputMedia }}
                                                error={!!errors.postalBilling}
                                                variant="filled"
                                                {...register('postalBilling')}
                                                autoComplete="postal-code"
                                                size="small"
                                                disabled={!selectedCountryBilling}
                                            />
                                            {errors.postalBilling && (
                                                <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                                    {errors.postalBilling.message}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </Box>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    id="defaultBillingAddress"
                                                    {...register('isDefaultBillingAddress')}
                                                />
                                            }
                                            label="Set address as default for billing"
                                            sx={STYLES.defaultBillingAddressCheckbox}
                                        />
                                    </FormGroup>
                                </Box>
                            )}
                        </Box>

                        <Button
                            sx={STYLES.button}
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={!isValid || appStatus === 'loading'}
                            color="info"
                        >
                            Sign up
                        </Button>
                    </FormGroup>
                    <Grid container>
                        <AuthFormLink
                            message={'If you already have an account, please '}
                            path={PATH.SIGNIN}
                            title={'login'}
                        />
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
