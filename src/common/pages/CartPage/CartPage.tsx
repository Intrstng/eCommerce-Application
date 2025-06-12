import { useTranslation } from 'react-i18next';
import S from './CartPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const CartPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <BreadCrumbs />
            <section className={S.cartContent}>{t('cartPage.description')}</section>
        </>
    );
};
