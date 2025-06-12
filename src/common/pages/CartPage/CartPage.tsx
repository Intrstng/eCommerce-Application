import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getActiveCartTC, clearCartTC } from '../../../features/cart/model/slices/cartSlice';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import Skeleton from '@mui/material/Skeleton';
import { CartItem } from './CartItem';
import S from './CartPage.module.scss';
import { getProductByIdTC } from '../../../features/catalog/model/slices/catalogSlice';
import type { LineItem } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../buttons/CustomButton';
import { ClearCartConfirmModal } from '../../components/ModalWindow/ClearCartConfirmModal/ClearCartConfirmModal';

type CartItemWithAvailability = {
    item: LineItem;
    availableQuantity?: number;
};

export const CartPage = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart.cart);
    const status = useAppSelector<Status>(statusSelector);
    const [lineItemsWithAvailability, setLineItemsWithAvailability] = useState<CartItemWithAvailability[]>([]);
    const [showClearCartModal, setShowClearCartModal] = useState(false);

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

    const handleClearCartClick = () => {
        setShowClearCartModal(true);
    };

    const handleConfirmClear = () => {
        dispatch(clearCartTC());
        setShowClearCartModal(false);
    };

    const handleCancelClear = () => {
        setShowClearCartModal(false);
    };

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
                    <Box className={S.emptyCartActionsContainer}>
                        <h4 className={S.emptyCartMessage}>
                            Your cart is empty. Let's find something great!
                        </h4>
                        <Link to="/catalog" className={S.shopNowLink}>
                            Shop Now
                        </Link>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box className={S.cartPageContent}>
            <BreadCrumbs />
            <Box className={S.cartContent}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <h2 className={S.cartTitle}>
                        Shopping Cart
                    </h2>
                    {cart.lineItems.length > 0 && (
                        <CustomButton
                            onClick={handleClearCartClick}
                            className={S.clearCartButton}
                        >
                            Clear Cart
                        </CustomButton>
                    )}
                </Box>
                {lineItemsWithAvailability.map(({ item, availableQuantity }) => (
                    <CartItem key={item.id} item={item} availableQuantity={availableQuantity} />
                ))}
                <Box className={S.cartSummary}>
                    <h3 className={S.totalPrice}> Total: {cart.totalPrice.centAmount / 100} EUR</h3>
                </Box>
            </Box>
            <ClearCartConfirmModal
                isOpen={showClearCartModal}
                onConfirm={handleConfirmClear}
                onCancel={handleCancelClear}
            />
        </Box>
    );
};
