import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, InputLabel } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FilledInput } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.signInForm';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import type { SignInFormData } from '../../../../common/validations/signInValidation.schema';
import { validateSignInSchema } from '../../../../common/validations/signInValidation.schema';
import { loginTC } from '../../model/slices/authSlice';
import { PATH } from '../../../../common/enums';
import { AuthFormLink } from '../../../../common/components/AuthFormLink/AuthFormLink';
import { onMouseDownPassword } from '../../utils/auth-handlers';
import { statusSelector } from 'app/model/selectors/appSelectors';
import type { Status } from 'app/model/types';

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const dispatch = useAppDispatch();

    const onClickShowPassword = () => {
        setShowPassword(show => !show);
    };

    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors, isValid },
    } = useForm<SignInFormData>({
        mode: 'all',
        resolver: yupResolver(validateSignInSchema()),
    });

    const onSubmit: SubmitHandler<SignInFormData> = data => {
        dispatch(loginTC(data));
        // reset();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={STYLES.content}>
                <Avatar sx={STYLES.logo}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h2" variant="h5">
                    Login to account
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup>
                        <FormControl fullWidth variant="filled">
                            <TextField
                                label="Email"
                                type="text"
                                margin="normal"
                                fullWidth
                                id="email"
                                error={!!errors.email}
                                variant="filled"
                                sx={STYLES.emailInput}
                                {...register('email')}
                                autoComplete="email"
                                size="small"
                            />
                            {errors.email && (
                                <Typography
                                    component="h2"
                                    variant="body2"
                                    sx={{ ...STYLES.errorForm, ...STYLES.errorMail }}
                                >
                                    {errors.email.message}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl variant="filled" size="small" error={!!errors.password}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <FilledInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                autoComplete="current-password"
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
                            />
                            {!isValid && errors.password && (
                                <Typography
                                    component="h2"
                                    variant="body2"
                                    sx={{ ...STYLES.errorForm, ...STYLES.errorPass }}
                                >
                                    {errors.password.message}
                                </Typography>
                            )}
                        </FormControl>
                        <Button
                            sx={STYLES.button}
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={!isValid || appStatus === 'loading'}
                            color="info"
                        >
                            Sign in
                        </Button>
                    </FormGroup>
                    <Grid container>
                        <AuthFormLink
                            message={"If you don't have an account yet, please "}
                            path={PATH.SIGNUP}
                            title={'register'}
                        />
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
