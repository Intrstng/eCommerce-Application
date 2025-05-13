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
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { STYLES } from './styles.signUpForm';
import { COUNTRIES } from '../../../../common/validations/validation-data/validation-data';
import { PATH } from '../../../../common/enums';
import { errorNotifyMessage } from '../../../../common/utils/notify-message';
import type { SignUpFormData } from '../../../../common/validations/signUpValidation.shema';
import { validateSignUpSchema } from '../../../../common/validations/signUpValidation.shema';
import { onMouseDownConfirmPassword, onMouseDownPassword } from '../../utils/auth-handlers';
import { AuthFormLink } from '../../../../common/components/AuthFormLink/AuthFormLink';
import { registerStart, registerSuccess, registerFailure } from '../../model/slices/authSlice';
import { authAPI } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../common/hooks';
import { Resolver } from 'react-hook-form';

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
    } = useForm<SignUpFormData>({
        mode: 'all',
        resolver: yupResolver(validateSignUpSchema()) as Resolver<SignUpFormData>,
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            streetShipping: '',
            cityShipping: '',
            countryShipping: '',
            postalShipping: '',
            streetBilling: '',
            cityBilling: '',
            countryBilling: '',
            postalBilling: '',
            isDefaultShippingAddress: false,
            isDefaultBillingAddress: false,
            isBillingSameAsShipping: false,
        },
    });

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        try {
            setLoading(true);
            dispatch(registerStart());

            if (!data.streetShipping || !data.cityShipping || !data.countryShipping || !data.postalShipping) {
                throw new Error('All shipping address fields are required');
            }

            const shippingAddress = {
                streetName: data.streetShipping,
                city: data.cityShipping,
                country: data.countryShipping,
                postalCode: data.postalShipping,
            };

            const addresses = [shippingAddress];
            let defaultShippingAddress: number | undefined;
            let defaultBillingAddress: number | undefined;
            const shippingAddresses = [0];
            let billingAddresses = [0];

            if (!data.isBillingSameAsShipping) {
                if (!data.streetBilling || !data.cityBilling || !data.countryBilling || !data.postalBilling) {
                    throw new Error('All billing address fields are required');
                }

                const billingAddress = {
                    streetName: data.streetBilling,
                    city: data.cityBilling,
                    country: data.countryBilling,
                    postalCode: data.postalBilling,
                };
                addresses.push(billingAddress);
                billingAddresses = [1];
            }

            if (data.isDefaultShippingAddress) {
                defaultShippingAddress = 0;
            }

            if (data.isDefaultBillingAddress) {
                defaultBillingAddress = data.isBillingSameAsShipping ? 0 : 1;
            }

            const response = await authAPI.register({
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
            });

            if (response.body) {
                dispatch(registerSuccess(response.body));
                localStorage.setItem('user', JSON.stringify(response.body));
                setValue('isDefaultShippingAddress', false);
                setValue('isBillingSameAsShipping', false);
                setValue('isDefaultBillingAddress', false);
                reset();
                navigate('/');
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(registerFailure(error.message));
                errorNotifyMessage(error.message);
            } else {
                dispatch(registerFailure('Registration failed'));
                errorNotifyMessage('Registration failed');
            }
        } finally {
            setLoading(false);
        }
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
                                        variant="outlined"
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

                                <FormControl variant="outlined" size="small" error={!!errors.password} fullWidth>
                                    <InputLabel htmlFor="passwordSignUp">Password</InputLabel>
                                    <OutlinedInput
                                        id="passwordSignUp"
                                        type={showPassword ? 'text' : 'password'}
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

                                <FormControl variant="outlined" size="small" error={!!errors.confirmPassword} fullWidth>
                                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                                    <OutlinedInput
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
                                        variant="outlined"
                                        sx={STYLES.nameInput}
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
                                        variant="outlined"
                                        sx={STYLES.nameInput}
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
                                        variant="outlined"
                                        sx={STYLES.dateInput}
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
                                        }}
                                        error={!!errors.streetShipping}
                                        variant="outlined"
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
                                        }}
                                        error={!!errors.cityShipping}
                                        variant="outlined"
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

                                <FormControl fullWidth>
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
                                        variant="outlined"
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
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Street"
                                                type="text"
                                                fullWidth
                                                id="streetBilling"
                                                sx={{
                                                    ...STYLES.addressInput,
                                                    ...STYLES.addressInputMedia,
                                                }}
                                                error={!!errors.streetBilling}
                                                variant="outlined"
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
                                                }}
                                                error={!!errors.cityBilling}
                                                variant="outlined"
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

                                        <FormControl fullWidth>
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
                                                variant="outlined"
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
                            disabled={!isValid || loading}
                            color="info"
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign up'
                            )}
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
