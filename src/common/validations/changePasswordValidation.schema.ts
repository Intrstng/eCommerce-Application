import * as yup from 'yup';

export type ChangePasswordData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export const validateChangePasswordSchema = () => {
    return yup.object().shape({
        currentPassword: yup
            .string()
            .strict(true)
            .required('Password is required')
            .trim('Password must not contain leading or trailing whitespace')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']*/u,
                'Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character'
            )
            .min(8, 'Password must be at least 8 characters long'),
        newPassword: yup
            .string()
            .strict(true)
            .required('Password is required')
            .trim('Password must not contain leading or trailing whitespace')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']*/u,
                'Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character'
            )
            .min(8, 'Password must be at least 8 characters long'),
        confirmPassword: yup
            .string()
            .required('Password is required')
            .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
    });
};
