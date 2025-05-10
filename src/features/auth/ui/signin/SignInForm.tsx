import type { MouseEvent } from 'react';
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
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { STYLES } from './styles.signInForm';
import { useAppDispatch } from '../../../../common/hooks';
import type { SignInFormData } from '../../../../common/validations/signInValidation.schema';
import { validateSignInSchema } from '../../../../common/validations/signInValidation.schema';
import { authActions } from '../../model/slices/authSlice';
import { PATH } from '../../../../common/enums';
import { errorNotifyMessage } from '../../../../common/utils/notify-message';

const onMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();

    const onClickShowPassword = () => {
        setShowPassword(show => !show);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<SignInFormData>({
        mode: 'all',
        resolver: yupResolver(validateSignInSchema()),
    });

    const onSubmit: SubmitHandler<SignInFormData> = data => {
        try {
            // await signInUser(data.email, data.password); // ToDo: add logic to signInUser
            console.log(data.email, data.password);
            dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
            reset();
        } catch (error) {
            if (error instanceof Error) {
                errorNotifyMessage(error.message);
            }
        }
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
                        <FormControl fullWidth>
                            <TextField
                                label="Email"
                                type="email"
                                margin="normal"
                                fullWidth
                                id="email"
                                error={!!errors.email}
                                variant="outlined"
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
                        <FormControl variant="outlined" size="small" error={!!errors.password}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
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
                                label="Password"
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
                            disabled={!isValid}
                            color="info"
                        >
                            Sign in
                        </Button>
                    </FormGroup>
                    <Grid container>
                        <Link
                            href={PATH.SIGNUP}
                            variant="subtitle2"
                            underline="hover"
                            color="info.main"
                            sx={STYLES.linkSignUp}
                        >
                            If you don't have an account yet, please register
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
