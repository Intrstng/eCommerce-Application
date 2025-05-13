import { useTranslation } from 'react-i18next';
import S from './CartPage.module.scss';

export const CartPage = () => {
    const { t } = useTranslation();
    return <section className={S.cartContent}>{t('cartPage.emptyMessage')}</section>;
};
