import S from './CartPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';

export const CartPage = () => {
    return (
        <Box className={S.cartPageContent}>
            <BreadCrumbs />
            <section className={S.cartContent}>Here will be User`s cart of orders</section>
        </Box>
    );
};
