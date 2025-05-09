import * as yup from 'yup';

export type SignInFormData = {
    email: string;
    password: string;
};

export const validateSignInSchema = () => {
    return yup
        .object({
            email: yup
                .string()
                .lowercase()
                .trim()
                .required('Email is required')
                .email('The email address must be in the format user@domain.com')
                .test('email-domain', 'Email must contain a domain name (e.g., example.com)', value => {
                    if (!value) return false;
                    const parts = value.split('@');
                    if (parts.length !== 2) return false;

                    const domain = parts[1];
                    const domainParts = domain.split('.');
                    const lastPart = domainParts.at(-1);
                    return domainParts.length >= 2 && !!lastPart && lastPart.length >= 2;
                }),
            password: yup
                .string()
                .trim()
                .required('Password is required')
                .matches(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']*/u,
                    'Password must contain at least one capital Latin letter, one lowercase Latin letter, one digit, and one special character'
                )
                .min(8, 'Password must be at least 8 characters long'),
        })
        .defined();
};
