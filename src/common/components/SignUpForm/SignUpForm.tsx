import type { MouseEvent } from 'react';
import { useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
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
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { SignUpFormData } from '../../validations/signUpValidation.shema';
import { validateSignUpSchema } from '../../validations/signUpValidation.shema';
import { PATH } from '../../enums';
import { errorNotifyMessage } from '../../utils/notify-message';
import { STYLES } from './styles.signUpForm';
import { COUNTRIES } from '../../validations/validation-data/validation-data';
import { useWatch } from 'react-hook-form';

const onMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};
const onMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    } = useForm<SignUpFormData>({
        // useForm({
        mode: 'all',
        resolver: yupResolver(validateSignUpSchema()),
        defaultValues: {
            country: '',
            countryBilling: '',
        },
    });

    const onSubmit: SubmitHandler<SignUpFormData> = data => {
        try {
            // await signUpUser(data.email, data.firstName, data.password...);
            console.log(data);
            console.log(data.birthDate);
            reset();
        } catch (error) {
            if (error instanceof Error) {
                errorNotifyMessage(error.message);
            }
        }
    };

    const selectedCountry = useWatch({
        control,
        name: 'country',
    });

    const selectedCountryBilling = useWatch({
        control,
        name: 'countryBilling',
    });

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
                                Delivery address
                            </Typography>
                            <Box sx={STYLES.formDelivery}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Street"
                                        type="text"
                                        fullWidth
                                        id="street"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.addressInputMedia,
                                        }}
                                        error={!!errors.street}
                                        variant="outlined"
                                        {...register('street')}
                                        autoComplete="street-address"
                                        size="small"
                                    />
                                    {errors.street && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.street.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label="City"
                                        type="text"
                                        fullWidth
                                        id="city"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.addressInputMedia,
                                        }}
                                        error={!!errors.city}
                                        variant="outlined"
                                        {...register('city')}
                                        autoComplete="address-level2"
                                        size="small"
                                    />
                                    {errors.city && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.city.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="country-label" sx={STYLES.countryLabel}>
                                        Country
                                    </InputLabel>
                                    <Select
                                        labelId="country-label"
                                        id="country"
                                        label="Country"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.countryInput,
                                            ...STYLES.addressInputMedia,
                                        }}
                                        error={!!errors.country}
                                        {...register('country')}
                                        size="small"
                                        value={selectedCountry || ''}
                                    >
                                        {COUNTRIES.map(country => (
                                            <MenuItem key={country.code} value={country.code}>
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.country && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.country.message}
                                        </Typography>
                                    )}
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        label={selectedCountry ? 'Postal code' : 'Select a country first'}
                                        type="text"
                                        fullWidth
                                        id="postal"
                                        sx={{
                                            ...STYLES.addressInput,
                                            ...STYLES.addressInputMedia,
                                        }}
                                        error={!!errors.postal}
                                        variant="outlined"
                                        {...register('postal')}
                                        autoComplete="postal-code"
                                        size="small"
                                        disabled={!selectedCountry}
                                    />
                                    {errors.postal && (
                                        <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                            {errors.postal.message}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>
                        </Box>

                        <Box>
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
                                        value={selectedCountryBilling || ''}
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
                                        label={selectedCountryBilling ? 'Postal code' : 'Select a country first'}
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
                        </Box>

                        <Button
                            sx={STYLES.button}
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={!isValid}
                            color="info"
                        >
                            Sign up
                        </Button>
                    </FormGroup>
                    <Grid container>
                        <Link
                            href={PATH.SIGNIN}
                            variant="subtitle2"
                            underline="hover"
                            color="info.main"
                            sx={STYLES.linkSignIn}
                        >
                            If you already have an account, please sign in
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

// defaultShippingAddress
// defaultBillingAddress
