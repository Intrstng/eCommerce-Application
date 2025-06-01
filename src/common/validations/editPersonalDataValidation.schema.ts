import * as yup from 'yup';

export type EditPersonalData = {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
};

export const validateEditPersonalDataSchema = () => {
    return yup.object().shape({
        firstName: yup
            .string()
            .trim()
            .required('Name is required')
            .matches(/^[A-Za-zЁА-яё]+$/, {
                message: 'First name must contain at least one character and not contain special characters or digits',
            }),
        lastName: yup
            .string()
            .trim()
            .required('Last name is required')
            .matches(/^[A-Za-zЁА-яё]+$/, {
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
    });
};
