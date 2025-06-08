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
