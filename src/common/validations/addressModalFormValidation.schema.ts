import * as yup from 'yup';
import { COUNTRIES, ZIP_CODE_PATTERNS } from './validation-data/validation-data';
import type { AddressModalType } from '../enums';

export interface AddressModalFormData {
    street: string;
    city: string;
    postal: string;
    country: string;

    isDefaultShippingAddress?: boolean;
    isDefaultBillingAddress?: boolean;

    addressType?: AddressModalType;
}

export const validateAddressModalFormSchema = () => {
    return yup.object().shape({
        street: yup.string().trim().required('Street is required'),
        city: yup
            .string()
            .trim()
            .required('City is required')
            .matches(/^[A-Za-z]+$/, {
                message: 'City must contain at least one character and not contain special characters or digits',
            }),
        country: yup
            .string()
            .trim()
            .required('Country is required')
            .oneOf([...COUNTRIES.map(country => country.code), ''], 'Invalid country'),
        postal: yup
            .string()
            .trim()
            .required('Postal code is required')
            .test('postal-code', 'Invalid postal code format', function (value) {
                if (!value) return false;

                const country: string | undefined = this.resolve(yup.ref('country'));

                if (!country || !ZIP_CODE_PATTERNS[country]) {
                    return true;
                }

                const pattern: RegExp | undefined = ZIP_CODE_PATTERNS[country].pattern;
                const example: string | undefined = ZIP_CODE_PATTERNS[country].example;

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
        isDefaultShippingAddress: yup.boolean().optional(),
        isDefaultBillingAddress: yup.boolean().optional(),
    });
};
