// import { useTranslation } from 'react-i18next';
// import S from './CartPage.module.scss';
//
// export const CartPage = () => {
//     const { t } = useTranslation();
//     return <section className={S.cartContent}>{t('cartPage.emptyMessage')}</section>;
// };

import S from './CartPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const CartPage = () => {
    return (
        <>
            <BreadCrumbs />
            <section className={S.cartContent}>Here will be User`s cart of orders</section>
        </>
    );
};
