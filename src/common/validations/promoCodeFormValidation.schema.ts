import * as yup from 'yup';
import type { DiscountCode } from '@commercetools/platform-sdk';

export interface PromoCodeFormData {
    promoCode: string;
}

export const validatePromoCodeFormSchema = (promoCodes: DiscountCode[]) => {
    const validActivePromoCodes = new Set(
        promoCodes
            .filter(code => {
                return code.isActive && code.key;
            })
            .map(code => code.key)
    );

    const allPromoCodeKeys = new Set(promoCodes.map(code => code.key).filter(key => key !== undefined));

    return yup.object().shape({
        promoCode: yup
            .string()
            .trim()
            .required('Promo code is required')
            .test('exists', 'Invalid promo code', value => allPromoCodeKeys.has(value))
            .test('active', 'This promo code is not active or has expired', value => validActivePromoCodes.has(value)),
    });
};
