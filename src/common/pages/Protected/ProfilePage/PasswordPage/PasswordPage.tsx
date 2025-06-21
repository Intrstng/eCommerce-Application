// Works good. Without !isValid. Instead of it cross-validation-check between currentPassword and newPassword in useEffect (parallel error handling) is used.
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {
    onMouseDownConfirmPassword,
    onMouseDownCurrentPassword,
    onMouseDownPassword,
} from '../../../../../features/auth/utils/auth-handlers';
import FormGroup from '@mui/material/FormGroup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import type { ChangePasswordData } from '../../../../validations/changePasswordValidation.schema';
import { validateChangePasswordSchema } from '../../../../validations/changePasswordValidation.schema';
import { changeCurrentCustomersPasswordTC } from '../../../../../features/profile/model/slices/__tests__/profileSlice';
import { STYLES } from './styles.passwordPage';

export const PasswordPage = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const dispatch = useAppDispatch();

    const passwordInputReference = useRef<HTMLInputElement | null>(null);

    const onClickShowCurrentPassword = () => {
        setShowCurrentPassword(show => !show);
    };

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
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        mode: 'all',
        // mode: 'onChange',
        resolver: yupResolver(validateChangePasswordSchema()),
    });

    const currentPasswordValue = watch('currentPassword');
    const newPasswordValue = watch('newPassword');
    const confirmPasswordValue = watch('confirmPassword');

    useEffect(() => {
        const validatePasswords = async () => {
            if (currentPasswordValue && newPasswordValue.length > 0) {
                await trigger('newPassword');
            }
            if (newPasswordValue) {
                await trigger('currentPassword');
            }
            if (confirmPasswordValue) {
                await trigger('confirmPassword');
            }
        };
        void validatePasswords();
    }, [currentPasswordValue, newPasswordValue, confirmPasswordValue, trigger]);

    const isCancelDisabled = !currentPasswordValue && !newPasswordValue && !confirmPasswordValue;

    const onSubmit: SubmitHandler<ChangePasswordData> = data => {
        dispatch(changeCurrentCustomersPasswordTC(data.currentPassword, data.newPassword));
        reset();
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <Box sx={STYLES.passwordsContent}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={STYLES.passwordsForm}>
                <FormGroup>
                    <Box>
                        <Typography variant="h3" component="h3" sx={STYLES.passwordTitle}>
                            Change Password
                        </Typography>
                        <Box sx={STYLES.formPass}>
                            {/* Hidden username input for accessibility */}
                            <input type="text" style={{ display: 'none' }} autoComplete="username" />

                            <FormControl variant="filled" size="small" error={!!errors.currentPassword} fullWidth>
                                <InputLabel htmlFor="currentPassword" color="success">Current password</InputLabel>
                                <FilledInput
                                    id="currentPassword"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    sx={STYLES.passInput}
                                    color="success"
                                    {...register('currentPassword')}
                                    autoComplete="new-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle current password visibility"
                                                onClick={onClickShowCurrentPassword}
                                                onMouseDown={onMouseDownCurrentPassword}
                                                edge="end"
                                            >
                                                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {errors.currentPassword && (
                                    <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                        {errors.currentPassword.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <FormControl variant="filled" size="small" error={!!errors.newPassword} fullWidth>
                                <InputLabel htmlFor="newPassword" color="success">Password</InputLabel>
                                <FilledInput
                                    id="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    sx={STYLES.passInput}
                                    color="success"
                                    {...register('newPassword')}
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
                                />
                                {errors.newPassword && (
                                    <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                        {errors.newPassword.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <FormControl variant="filled" size="small" error={!!errors.confirmPassword} fullWidth>
                                <InputLabel htmlFor="confirmPassword" color="success">Confirm password</InputLabel>
                                <FilledInput
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    color="success"
                                    {...register('confirmPassword')}
                                    autoComplete="new-password"
                                    sx={STYLES.passInput}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={onClickShowConfirmPassword}
                                                onMouseDown={onMouseDownConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {errors.confirmPassword && (
                                    <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
                                        {errors.confirmPassword.message}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>
                    </Box>
                    <Button
                        sx={{
                            ...STYLES.passwordButton,
                            ...STYLES.cancelButton,
                        }}
                        type="button"
                        variant="contained"
                        color="info"
                        onClick={handleCancel}
                        disabled={isCancelDisabled}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            ...STYLES.passwordButton,
                            ...STYLES.submitButton,
                        }}
                        type="submit"
                        variant="contained"
                        disabled={!isValid || appStatus === 'loading'}
                        color="info"
                    >
                        Change password
                    </Button>
                </FormGroup>
            </Box>
        </Box>
    );
};

// // Works good by tricky !isValid used.
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { useEffect, useRef, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../hooks';
// import type { Status } from 'app/model/types';
// import { statusSelector } from 'app/model/selectors/appSelectors';
// import type { SubmitHandler } from 'react-hook-form';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { FilledInput, FormControl, InputLabel } from '@mui/material';
// import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
// import {
//     onMouseDownConfirmPassword,
//     onMouseDownCurrentPassword,
//     onMouseDownPassword,
// } from '../../../../features/auth/utils/auth-handlers';
// import FormGroup from '@mui/material/FormGroup';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import Button from '@mui/material/Button';
// import type { ChangePasswordData } from '../../../validations/changePasswordValidation.schema';
// import { validateChangePasswordSchema } from '../../../validations/changePasswordValidation.schema';
// import { changeCurrentCustomersPasswordTC } from '../../../../features/profile/model/slices/__tests__/profileSlice';
// import { STYLES } from './styles.passwordPage';
//
// export const PasswordPage = () => {
//     const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const appStatus: string = useAppSelector<Status>(statusSelector);
//     const dispatch = useAppDispatch();
//
//     const passwordInputReference = useRef<HTMLInputElement | null>(null);
//
//     const onClickShowCurrentPassword = () => {
//         setShowCurrentPassword(show => !show);
//     };
//
//     const onClickShowPassword = () => {
//         setShowPassword(show => !show);
//     };
//
//     const onClickShowConfirmPassword = () => {
//         setShowConfirmPassword(show => !show);
//     };
//
//     const {
//         register,
//         handleSubmit,
//         reset,
//         watch,
//         trigger,
//         formState: { errors, isValid },
//     } = useForm({
//         //  } = useForm<ChangePasswordData>({
//         mode: 'all',
//         resolver: yupResolver(validateChangePasswordSchema()),
//         // mode: 'onChange',
//     });
//
//     const currentPasswordValue = watch('currentPassword');
//     const passwordValue = watch('newPassword');
//     const confirmPasswordValue = watch('confirmPassword');
//
//     useEffect(() => {
//         const validateConfirmPassword = async () => {
//             if (confirmPasswordValue) {
//                 await trigger('confirmPassword');
//             }
//         };
//
//         void validateConfirmPassword();
//     }, [passwordValue, trigger, confirmPasswordValue]);
//
//     const isCancelDisabled = !currentPasswordValue && !passwordValue && !confirmPasswordValue;
//
//     const onSubmit: SubmitHandler<ChangePasswordData> = data => {
//         dispatch(changeCurrentCustomersPasswordTC(data.currentPassword, data.newPassword));
//         reset();
//     };
//
//     const handleCancel = () => {
//         reset();
//     };
//
//     return (
//         <Box sx={STYLES.passwordsContent}>
//             <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={STYLES.passwordsForm}>
//                 <FormGroup>
//                     <Box>
//                         <Typography variant="h3" component="h3" sx={STYLES.passwordTitle}>
//                             Change Password
//                         </Typography>
//                         <Box sx={STYLES.formPass}>
//                             {/* Hidden username input for accessibility */}
//                             <input type="text" style={{ display: 'none' }} autoComplete="username" />
//
//                             <FormControl
//                                 variant="filled"
//                                 size="small"
//                                 error={!!(errors.currentPassword && !isValid)}
//                                 fullWidth
//                             >
//                                 <InputLabel htmlFor="currentPassword">Current password</InputLabel>
//                                 <FilledInput
//                                     id="currentPassword"
//                                     type={showCurrentPassword ? 'text' : 'password'}
//                                     sx={STYLES.passInput}
//                                     {...register('currentPassword')}
//                                     autoComplete="new-password"
//                                     endAdornment={
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle current password visibility"
//                                                 onClick={onClickShowCurrentPassword}
//                                                 onMouseDown={onMouseDownCurrentPassword}
//                                                 edge="end"
//                                             >
//                                                 {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     }
//                                 />
//                                 {errors.currentPassword && !isValid && (
//                                     <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
//                                         {errors.currentPassword.message}
//                                     </Typography>
//                                 )}
//                             </FormControl>
//
//                             <FormControl
//                                 variant="filled"
//                                 size="small"
//                                 error={!!(errors.newPassword && !isValid)}
//                                 fullWidth
//                             >
//                                 <InputLabel htmlFor="newPassword">Password</InputLabel>
//                                 <FilledInput
//                                     id="newPassword"
//                                     type={showPassword ? 'text' : 'password'}
//                                     sx={STYLES.passInput}
//                                     {...register('newPassword')}
//                                     autoComplete="new-password"
//                                     inputRef={passwordInputReference}
//                                     endAdornment={
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle password visibility"
//                                                 onClick={onClickShowPassword}
//                                                 onMouseDown={onMouseDownPassword}
//                                                 edge="end"
//                                             >
//                                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     }
//                                 />
//                                 {errors.newPassword && !isValid && (
//                                     <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
//                                         {errors.newPassword.message}
//                                     </Typography>
//                                 )}
//                             </FormControl>
//
//                             <FormControl variant="filled" size="small" error={!!errors.confirmPassword} fullWidth>
//                                 <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
//                                 <FilledInput
//                                     id="confirmPassword"
//                                     type={showConfirmPassword ? 'text' : 'password'}
//                                     {...register('confirmPassword')}
//                                     autoComplete="new-password"
//                                     sx={STYLES.passInput}
//                                     endAdornment={
//                                         <InputAdornment position="end">
//                                             <IconButton
//                                                 aria-label="toggle confirm password visibility"
//                                                 onClick={onClickShowConfirmPassword}
//                                                 onMouseDown={onMouseDownConfirmPassword}
//                                                 edge="end"
//                                             >
//                                                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     }
//                                 />
//                                 {errors.confirmPassword && (
//                                     <Typography component="h2" variant="body2" sx={STYLES.errorForm}>
//                                         {errors.confirmPassword.message}
//                                     </Typography>
//                                 )}
//                             </FormControl>
//                         </Box>
//                     </Box>
//                     <Button
//                         sx={{
//                             ...STYLES.passwordButton,
//                             ...STYLES.cancelButton,
//                         }}
//                         type="button"
//                         variant="contained"
//                         color="info"
//                         onClick={handleCancel}
//                         disabled={isCancelDisabled}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         sx={{
//                             ...STYLES.passwordButton,
//                             ...STYLES.submitButton,
//                         }}
//                         type="submit"
//                         variant="contained"
//                         disabled={!isValid || appStatus === 'loading'}
//                         color="info"
//                     >
//                         Change password
//                     </Button>
//                 </FormGroup>
//             </Box>
//         </Box>
//     );
// };
