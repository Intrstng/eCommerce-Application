import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActiveCartTC } from '../../../features/cart/model/slices/cartSlice';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import Skeleton from '@mui/material/Skeleton';
import { CartItem } from './CartItem';
import S from './CartPage.module.scss';
import { getProductByIdTC } from '../../../features/catalog/model/slices/catalogSlice';
import type { LineItem } from '@commercetools/platform-sdk';

type CartItemWithAvailability = {
    item: LineItem;
    availableQuantity?: number;
};

export const CartPage = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart.cart);
    const status = useAppSelector<Status>(statusSelector);
    const [lineItemsWithAvailability, setLineItemsWithAvailability] = useState<CartItemWithAvailability[]>([]);

    useEffect(() => {
        dispatch(getActiveCartTC());
    }, [dispatch]);

    useEffect(() => {
        const fetchProductAvailability = async () => {
            if (cart && cart.lineItems.length > 0) {
                const productsPromises = cart.lineItems.map(item => dispatch(getProductByIdTC(item.productId)));
                const productsResults = await Promise.all(productsPromises);

                const updatedLineItems: CartItemWithAvailability[] = cart.lineItems.map(item => {
                    const catalogProduct = productsResults.find(product => product.id === item.productId);

                    const variant = catalogProduct?.variants.find(v => v.id === item.variant.id);
                    const availableQuantity = variant?.availability?.availableQuantity;

                    return {
                        item,
                        availableQuantity,
                    };
                });
                setLineItemsWithAvailability(updatedLineItems);
            }
        };
        fetchProductAvailability();
    }, [cart, dispatch]);

    if (status === 'loading') {
        return (
            <Box className={S.cartPageContent}>
                <BreadCrumbs />
                <Box className={S.cartContent}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 2 }} />
                </Box>
            </Box>
        );
    }

    if (!cart || cart.lineItems.length === 0) {
        return (
            <Box className={S.cartPageContent}>
                <BreadCrumbs />
                <Box className={S.cartContent}>
                    <Typography variant="h5" className={S.emptyCartMessage}>
                        Your cart is empty
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box className={S.cartPageContent}>
            <BreadCrumbs />
            <Box className={S.cartContent}>
                <Typography variant="h4" className={S.cartTitle}>
                    Shopping Cart
                </Typography>
                {lineItemsWithAvailability.map(({ item, availableQuantity }) => (
                    <CartItem key={item.id} item={item} availableQuantity={availableQuantity} />
                ))}
                <Box className={S.cartSummary}>
                    <Typography variant="h6">Total: {cart.totalPrice.centAmount / 100} EUR</Typography>
                </Box>
            </Box>
        </Box>
    );
};
