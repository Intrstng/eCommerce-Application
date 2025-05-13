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
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { STYLES } from './styles.signInForm';
import { useAppDispatch } from '../../../../common/hooks';
import type { SignInFormData } from '../../../../common/validations/signInValidation.schema';
import { validateSignInSchema } from '../../../../common/validations/signInValidation.schema';
import { loginStart, loginSuccess, loginFailure } from '../../model/slices/authSlice';
import { PATH } from '../../../../common/enums';
import { errorNotifyMessage } from '../../../../common/utils/notify-message';
import { AuthFormLink } from '../../../../common/components/AuthFormLink/AuthFormLink';
import { onMouseDownPassword } from '../../utils/auth-handlers';
import { authAPI } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        try {
            setLoading(true);
            dispatch(loginStart());
            const response = await authAPI.login(data.email, data.password);

            if (response.body) {
                dispatch(loginSuccess(response.body));
                localStorage.setItem('user', JSON.stringify(response.body));
                reset();
                navigate('/');
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(loginFailure(error.message));
                errorNotifyMessage(error.message);
            } else {
                dispatch(loginFailure('Invalid email or password'));
                errorNotifyMessage('Invalid email or password');
            }
        } finally {
            setLoading(false);
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
                            disabled={!isValid || loading}
                            color="info"
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Sign in'
                            )}
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
