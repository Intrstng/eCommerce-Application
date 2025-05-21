import * as yup from 'yup';
import { COUNTRIES, ZIP_CODE_PATTERNS } from './validation-data/validation-data';

export type SignUpFormData = {
    email: string;
    password: string;

    firstName: string;
    lastName: string;
    birthDate: string;

    streetShipping: string;
    cityShipping: string;
    postalShipping: string;
    countryShipping: string;

    streetBilling?: string;
    cityBilling?: string;
    postalBilling?: string;
    countryBilling?: string;

    confirmPassword: string;

    isDefaultShippingAddress?: boolean;
    isDefaultBillingAddress?: boolean;

    isBillingSameAsShipping: boolean;
};

export const validateSignUpSchema = () => {
    return yup.object().shape({
        firstName: yup
            .string()
            .trim()
            .required('Name is required')
            .matches(/^[A-Za-zА-Яа-яЁё]+$/, {
                message: 'First name must contain at least one character and not contain special characters or digits',
            }),
        lastName: yup
            .string()
            .trim()
            .required('Last name is required')
            .matches(/^[A-Za-zА-Яа-яЁё]+$/, {
                message: 'Last name must contain at least one character and not contain special characters or digits',
            }),
        email: yup
            .string()
            .strict(true)
            .lowercase()
            .required('Email is required')
            .trim('Email address must not contain leading or trailing whitespace')
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
            .oneOf([yup.ref('password')], 'Passwords do not match'),
        birthDate: yup
            .string() //.date()
            .required('Birth date is required')
            .test('age', 'You must be at least 13 and no more than 100 years old', value => {
                const today = new Date();
                const birthDate = value ? new Date(value) : null;
                if (!birthDate) return false;
                let age = today.getFullYear() - birthDate.getFullYear();
                const month = today.getMonth() - birthDate.getMonth();
                if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return !(age < 13 || age > 100);
            }),
        streetShipping: yup.string().trim().required('Street is required'),
        cityShipping: yup
            .string()
            .trim()
            .required('City is required')
            .matches(/^[A-Za-z]+$/, {
                message: 'City must contain at least one character and not contain special characters or digits',
            }),
        countryShipping: yup
            .string()
            .trim()
            .required('Country is required')
            .oneOf([...COUNTRIES.map(country => country.code), ''], 'Invalid country'),
        postalShipping: yup
            .string()
            .trim()
            .required('Postal code is required')
            .test('postal-code', 'Invalid postal code format', function (value) {
                if (!value) return false;

                const countryShipping: string | undefined = this.resolve(yup.ref('countryShipping'));

                if (!countryShipping || !ZIP_CODE_PATTERNS[countryShipping]) {
                    return true;
                }

                const pattern: RegExp | undefined = ZIP_CODE_PATTERNS[countryShipping].pattern;
                const example: string | undefined = ZIP_CODE_PATTERNS[countryShipping].example;

                if (!pattern) {
                    return true;
                }

                const isValid = pattern.test(value);

                if (!isValid) {
                    return this.createError({
                        message: `Postal code must be in format: ${example}`,
                    });
                }

                return isValid;
            }),

        streetBilling: yup
            .string()
            .trim()
            .when('isBillingSameAsShipping', {
                is: true,
                then: schema => schema.notRequired(),
                otherwise: schema => schema.required('Street is required'),
            }),
        cityBilling: yup
            .string()
            .trim()
            .when('isBillingSameAsShipping', {
                is: true,
                then: schema => schema.notRequired(),
                otherwise: schema =>
                    schema.required('City is required').matches(/^[A-Za-z]+$/, {
                        message:
                            'City must contain at least one character and not contain special characters or digits',
                    }),
            }),
        countryBilling: yup
            .string()
            .trim()
            .when('isBillingSameAsShipping', {
                is: true,
                then: schema => schema.notRequired(),
                otherwise: schema =>
                    schema
                        .required('Country is required')
                        .oneOf([...COUNTRIES.map(country => country.code), ''], 'Invalid country'),
            }),
        postalBilling: yup
            .string()
            .trim()
            .when('isBillingSameAsShipping', {
                is: true,
                then: schema => schema.notRequired(),
                otherwise: schema =>
                    schema
                        .required('Postal code is required')
                        .test('postal-code', 'Invalid postal code format', function (value) {
                            if (!value) return false;

                            const countryBilling: string | undefined = this.resolve(yup.ref('countryBilling'));

                            if (!countryBilling || !ZIP_CODE_PATTERNS[countryBilling]) {
                                return true;
                            }

                            const pattern: RegExp | undefined = ZIP_CODE_PATTERNS[countryBilling].pattern;
                            const example: string | undefined = ZIP_CODE_PATTERNS[countryBilling].example;

                            if (!pattern) {
                                return true;
                            }

                            const isValid = pattern.test(value);

                            if (!isValid) {
                                return this.createError({
                                    message: `Postal code must be in format: ${example}`,
                                });
                            }

                            return isValid;
                        }),
            }),
        isDefaultShippingAddress: yup.boolean().optional(),
        isBillingSameAsShipping: yup.boolean().required(),
        isDefaultBillingAddress: yup.boolean().optional(),
    });
};
