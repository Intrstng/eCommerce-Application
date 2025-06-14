import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCartTC, getActiveCartTC, applyPromoCodeTC } from '../../../features/cart/model/slices/cartSlice';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Status } from 'app/model/types';
import { CartItem } from './CartItem';
import S from './CartPage.module.scss';
import { cartSelector, cartStatusSelector } from '../../../features/cart/model/selectors/cartSelectors';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { catalogAPI } from '../../../features/catalog/api/catalogApi';
import type { CatalogProduct } from '../../../features/catalog/api/catalogApi.interfaces';
import type { CartItemWithAvailability } from './interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { CustomButton } from '../../buttons/CustomButton';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';
import { ClearCartConfirmModal } from '../../components/ModalWindow/ClearCartConfirmModal/ClearCartConfirmModal';
import TextField from '@mui/material/TextField';

interface DiscountedPriceValue {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
}

interface DiscountedPrice {
    value: DiscountedPriceValue;
    includedDiscounts: unknown[];
}

interface LineItemWithDiscountedPrice extends LineItem {
    discountedPrice?: DiscountedPrice;
}

export const CartPage = () => {
    const isCartLoading: string = useAppSelector<Status>(cartStatusSelector);
    const cart: Cart | null = useAppSelector(cartSelector);
    const dispatch = useAppDispatch();
    const [lineItemsWithAvailability, setLineItemsWithAvailability] = useState<CartItemWithAvailability[]>([]);
    const [showClearCartModal, setShowClearCartModal] = useState(false);
    const [promoCode, setPromoCode] = useState('');

    useEffect(() => {
        dispatch(getActiveCartTC());
    }, [dispatch]);

    useEffect(() => {
        const lineItems: LineItem[] = cart?.lineItems || [];

        const fetchProductAvailability = async () => {
            if (lineItems.length === 0) {
                setLineItemsWithAvailability([]);
                return;
            }

            try {
                const productPromises: Promise<CatalogProduct>[] = lineItems.map(item =>
                    catalogAPI.getProductByID(item.productId)
                );
                const productsResults = await Promise.all(productPromises);

                const updatedLineItems: CartItemWithAvailability[] = lineItems.map(item => {
                    const catalogProduct = productsResults.find(product => product.id === item.productId);

                    const variant = catalogProduct?.variants?.find(v => v.id === item.variant.id);
                    const availableQuantity = variant?.availability?.availableQuantity;

                    return {
                        item,
                        availableQuantity,
                    };
                });

                setLineItemsWithAvailability(updatedLineItems);
            } catch (error: unknown) {
                const error_ =
                    error instanceof Error
                        ? new Error(`Failed to fetch availability: ${error.message}`)
                        : new Error('Failed to fetch availability: Unknown error occurred');
                throw error_;
            }
        };
        void fetchProductAvailability();
    }, [cart]);

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

    const handleApplyPromoCode = () => {
        if (promoCode && cart) {
            dispatch(applyPromoCodeTC(cart.id, cart.version, promoCode));
        }
    };

    const lineItems: LineItemWithDiscountedPrice[] = cart?.lineItems ?? [];

    const calculateTotalPrice = () => {
        if (!cart) return { original: 0, discounted: 0 };

        const originalTotal = lineItems.reduce((total, item) => {
            return total + item.price.value.centAmount * item.quantity;
        }, 0);

        const discountedTotal = lineItems.reduce((total, item) => {
            const discountedPrice = item.discountedPrice
                ? item.discountedPrice.value.centAmount
                : item.price.value.centAmount;
            return total + discountedPrice * item.quantity;
        }, 0);

        return {
            original: originalTotal / 100,
            discounted: discountedTotal / 100,
        };
    };

    if (!cart || cart.lineItems.length === 0) {
        return (
            <Box className={S.cartPageContent}>
                <BreadCrumbs />
                <Box className={S.cartContent}>
                    <Box className={S.emptyCartActionsContainer}>
                        <Typography variant="h4" className={S.emptyCartMessage}>
                            Your cart is empty. Let's find something great!
                        </Typography>
                        <NavLink to={PATH.CATALOG} className={S.shopNowLink}>
                            Shop Now
                        </NavLink>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box className={S.cartPageContent}>
            <BreadCrumbs />
            <Box className={S.cartContent}>
                <Box className={S.cartHeader}>
                    <Typography variant="h4" className={S.cartTitle}>
                        Shopping Cart
                    </Typography>
                    {cart.lineItems.length > 0 && (
                        <CustomButton onClick={handleClearCartClick} className={S.clearCartButton}>
                            Clear Cart
                        </CustomButton>
                    )}
                </Box>
                {isCartLoading === 'loading' && (
                    <Box className={S.cartPageLoader}>
                        <CircularProgress color="success" className={S.cartPageSpinner} />
                    </Box>
                )}

                {lineItemsWithAvailability.map(({ item, availableQuantity }) => (
                    <CartItem key={item.id} item={item} availableQuantity={availableQuantity} />
                ))}

                <Box className={S.cartSummary}>
                    {isCartLoading !== 'loading' && (
                        <>
                            <Box className={S.promoCodeContainer}>
                                <TextField
                                    label="Promo Code"
                                    variant="outlined"
                                    size="small"
                                    value={promoCode}
                                    onChange={event => {
                                        setPromoCode(event.target.value);
                                    }}
                                    className={S.promoCodeInput}
                                />
                                <CustomButton onClick={handleApplyPromoCode} className={S.applyPromoButton}>
                                    Apply
                                </CustomButton>
                            </Box>
                            <Divider component="div" style={{ width: '100%' }} />
                            <Box className={S.priceContainer}>
                                {cart.discountCodes.length > 0 ? (
                                    <>
                                        <Typography className={S.originalPrice} variant="body2">
                                            Original Total: {calculateTotalPrice().original.toFixed(2)} EUR
                                        </Typography>
                                        <Typography className={S.discountedPrice} variant="h6">
                                            Total with discount: {calculateTotalPrice().discounted.toFixed(2)} EUR
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography className={S.cartTotalPrice} variant="h6">
                                        Total: {calculateTotalPrice().original.toFixed(2)} EUR
                                    </Typography>
                                )}
                            </Box>
                        </>
                    )}
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
