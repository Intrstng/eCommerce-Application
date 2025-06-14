import * as yup from 'yup';
import { PromoCodes } from '../enums';

export type PromoCodeFormData = {
    promoCode: PromoCodes | '';
};

export const AVAILABLE_PROMO_CODES: (PromoCodes | '')[] = [
    '',
    PromoCodes.STARRY,
    PromoCodes.LUNAR,
    PromoCodes.NEBULA,
    PromoCodes.SUNNA,
];

export const validatePromoCodeFormSchema = () => {
    return yup.object().shape({
        promoCode: yup
            .string()
            .trim()
            .required('Promo code is required')
            .oneOf(AVAILABLE_PROMO_CODES, 'Invalid promo code'),
    });
};
