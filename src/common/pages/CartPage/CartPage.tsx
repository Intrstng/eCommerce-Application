import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCartTC, getActiveCartTC } from '../../../features/cart/model/slices/cartSlice';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Status } from 'app/model/types';
import { CartItem } from './CartItem';
import S from './CartPage.module.scss';
import { cartSelector, cartStatusSelector } from '../../../features/cart/model/selectors/cartSelectors';
import type { Cart, DiscountCode, LineItem } from '@commercetools/platform-sdk';
import { catalogAPI } from '../../../features/catalog/api/catalogApi';
import type { CatalogProduct } from '../../../features/catalog/api/catalogApi.interfaces';
import type { CartItemWithAvailability, LineItemWithDiscountedPrice } from './interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { CustomButton } from '../../buttons/CustomButton';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../enums';
import { ClearCartConfirmModal } from '../../components/ModalWindow/ClearCartConfirmModal/ClearCartConfirmModal';
import TextField from '@mui/material/TextField';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { PromoCodeFormData } from '../../validations/promoCodeFormValidation.schema';
import { validatePromoCodeFormSchema } from '../../validations/promoCodeFormValidation.schema';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import {
    applyPromoCodeTC,
    discountActions,
    getAvailablePromoCodesTC,
    removePromoCodeTC,
    setActivePromoCodeTC,
} from '../../../features/discount/model/slices/discountSlice';
import {
    availablePromoCodesSelector,
    promoCodeSelector,
} from '../../../features/discount/model/selectors/discountSelectors';
import type { PromoCodeCartContent } from '../../types';
import { transformToPromoCodeCartContent } from '../../utils/transform-to-promo-code-cart-content';
import { findCurrentPromoCodeIdByCodeName } from '../../utils/find-current-promocode-id-by-code-name';
import { checkIsPromoCodeApplied } from '../../utils/check-is-promocode-applied';

export const CartPage = () => {
    const availablePromoCodes = useAppSelector<DiscountCode[]>(availablePromoCodesSelector);
    const currentPromoCode = useAppSelector<PromoCodeCartContent | null>(promoCodeSelector);
    const cart: Cart | null = useAppSelector(cartSelector);
    const cartStatus: string = useAppSelector<Status>(cartStatusSelector);
    const lineItems: LineItemWithDiscountedPrice[] = cart?.lineItems ?? [];
    const [lineItemsWithAvailability, setLineItemsWithAvailability] = useState<CartItemWithAvailability[]>([]);
    const [showClearCartModal, setShowClearCartModal] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAvailablePromoCodesTC());
    }, [dispatch]);

    // TODO: fix and add this useEffect
    useEffect(() => {
        if (cart) {
            // console.log('tick', cart)
            dispatch(setActivePromoCodeTC(cart));
        }
    }, [dispatch, cart]);
    // console.log(currentPromoCode, cart);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        getValues,
    } = useForm({
        // } = useForm<PromoCodeFormData>({
        mode: 'onChange',
        resolver: yupResolver(validatePromoCodeFormSchema(availablePromoCodes)),
        defaultValues: {
            promoCode: currentPromoCode?.key ?? currentPromoCode?.code ?? '',
        },
    });

    const onSubmit: SubmitHandler<PromoCodeFormData> = data => {
        const { promoCode } = data;

        const enteredPromoCodeData = availablePromoCodes.find(
            availablePromoCode => availablePromoCode?.key === promoCode || availablePromoCode.code === promoCode
        );

        if (enteredPromoCodeData) {
            const promoCodeCartContentToStore: PromoCodeCartContent =
                transformToPromoCodeCartContent(enteredPromoCodeData);
            dispatch(discountActions.setPromoCode({ promoCode: promoCodeCartContentToStore }));
            handleApplyPromoCode(promoCode);
        } else {
            throw new Error(`Entered promo code ${promoCode} is not valid`);
        }
    };

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

    const handleApplyPromoCode = (code: string) => {
        if (currentPromoCode && cart) {
            dispatch(applyPromoCodeTC(cart, code));
        }
    };

    const handleCancelPromoCode = () => {
        const currentPromoCodeValueInInput = getValues('promoCode');
        const promoCodeIdToCancel: string = findCurrentPromoCodeIdByCodeName(
            availablePromoCodes,
            currentPromoCodeValueInInput
        );

        if (!currentPromoCode && currentPromoCodeValueInInput) {
            reset({ promoCode: '' });
            console.log('Just clear input');
        } else if (
            cart &&
            cart?.discountCodes[0].discountCode.id === promoCodeIdToCancel &&
            currentPromoCodeValueInInput &&
            (currentPromoCode?.key === currentPromoCodeValueInInput ||
                currentPromoCode?.code === currentPromoCodeValueInInput)
        ) {
            dispatch(removePromoCodeTC(cart.id, cart.version, currentPromoCodeValueInInput));
            dispatch(discountActions.setPromoCode({ promoCode: null }));
            reset({ promoCode: '' });
            console.log('Clear input, clear store, update server');
        } else if (
            cart &&
            currentPromoCodeValueInInput &&
            (currentPromoCode?.key === currentPromoCodeValueInInput ||
                currentPromoCode?.code === currentPromoCodeValueInInput)
        ) {
            dispatch(discountActions.setPromoCode({ promoCode: null }));
            reset({ promoCode: '' });
            console.log('Clear input, clear store');
        }
    };

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

    const currentPromoCodeValueInInput = getValues('promoCode');
    const isPromoCodeApplied: boolean = checkIsPromoCodeApplied(
        currentPromoCodeValueInInput,
        currentPromoCode,
        availablePromoCodes,
        cart
    );

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
                {cartStatus === 'loading' && (
                    <Box className={S.cartPageLoader}>
                        <CircularProgress color="success" className={S.cartPageSpinner} />
                    </Box>
                )}

                {lineItemsWithAvailability.map(({ item, availableQuantity }) => (
                    <CartItem key={item.id} item={item} availableQuantity={availableQuantity} />
                ))}

                <Box className={S.cartSummary}>
                    {cartStatus !== 'loading' && (
                        <>
                            <Box
                                component="form"
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                                className={S.promoCodeContainer}
                            >
                                <FormGroup>
                                    <FormControl fullWidth>
                                        <Box className={S.promoCodeMessageContainer}>
                                            <Typography className={S.promoCodeMessage}>
                                                {isPromoCodeApplied
                                                    ? 'Promo code is applied.'
                                                    : 'Promo code is not applied.'}
                                            </Typography>
                                        </Box>
                                        <TextField
                                            label="Promo Code"
                                            type="text"
                                            fullWidth
                                            id="promoCode"
                                            error={!!errors.promoCode}
                                            variant="filled"
                                            {...register('promoCode')}
                                            size="small"
                                            className={S.promoCodeInput}
                                        />
                                        {errors.promoCode && (
                                            <Typography component="h2" variant="body2" className={S.errorForm}>
                                                {errors.promoCode.message}
                                            </Typography>
                                        )}
                                    </FormControl>
                                    <CustomButton
                                        className={S.applyPromoButton}
                                        type="submit"
                                        disabled={!isValid || cartStatus === 'loading'}
                                    >
                                        Apply promo code
                                    </CustomButton>
                                    <CustomButton
                                        onClick={handleCancelPromoCode}
                                        className={S.cancelPromoButton}
                                        disabled={!isValid || cartStatus === 'loading'}
                                    >
                                        Cancel promo code
                                    </CustomButton>
                                </FormGroup>
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
