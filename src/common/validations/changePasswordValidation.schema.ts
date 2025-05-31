// import * as yup from 'yup';
// import { isChangePasswordData } from '../utils/assertion-functions';
//
// export type ChangePasswordData = {
//     currentPassword: string;
//     newPassword: string;
//     confirmPassword: string;
// };
//
// export const validateChangePasswordSchema = () => {
//     return yup.object<ChangePasswordData>().shape({
//         currentPassword: yup
//             .string()
//             .strict(true)
//             .required('Password is required')
//             .trim('Password must not contain leading or trailing whitespace')
//             .matches(
//                 /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']*/u,
//                 'Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character'
//             )
//             .min(8, 'Password must be at least 8 characters long')
//             .test(
//                 'not-same-as-new',
//                 'Current password must be different from the new password',
//                 function (currentValue) {
//                     if (!isChangePasswordData(this.parent)) return false;
//                     const { newPassword } = this.parent;
//                     return !newPassword || currentValue !== newPassword;
//                 }
//             )
//         ,
//         newPassword: yup
//             .string()
//             .strict(true)
//             .required('Password is required')
//             .trim('Password must not contain leading or trailing whitespace')
//             .matches(
//                 /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']*/u,
//                 'Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character'
//             )
//             .min(8, 'Password must be at least 8 characters long')
//             .test('not-same', 'The new password must be different from the current password', function (value) {
//                 if (!isChangePasswordData(this.parent)) return false;
//                 return value !== this.parent.currentPassword;
//             }),
//         confirmPassword: yup
//             .string()
//             .required('Password is required')
//             .oneOf([yup.ref('newPassword')], 'Passwords do not match')
//     });
// };

import * as yup from 'yup';
import { isChangePasswordData } from '../utils/assertion-functions';

export type ChangePasswordData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export const validateChangePasswordSchema = () => {
    return yup.object<ChangePasswordData>().shape({
        currentPassword: yup
            .string()
            .strict(true)
            .required('Password is required')
            .trim('Password must not contain leading or trailing whitespace')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']*/u,
                'Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character'
            )
            .min(8, 'Password must be at least 8 characters long')
            .test(
                'not-same-as-new',
                'Current password must be different from the new password',
                function (currentValue) {
                    if (!isChangePasswordData(this.parent)) return false;
                    const { newPassword } = this.parent;
                    return !newPassword || currentValue !== newPassword;
                }
            ),
        newPassword: yup
            .string()
            .strict(true)
            .required('Password is required')
            .trim('Password must not contain leading or trailing whitespace')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']*/u,
                'Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character'
            )
            .min(8, 'Password must be at least 8 characters long')
            .test('not-same', 'The new password must be different from the current password', function (value) {
                if (!isChangePasswordData(this.parent)) return false;
                return value !== this.parent.currentPassword;
            }),
        confirmPassword: yup
            .string()
            .required('Password is required')
            .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
    });
};
