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
import type { CartItemWithAvailability } from './interfaces';
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
    const currentPromoCode = useAppSelector(promoCodeSelector);
    const cart: Cart | null = useAppSelector(cartSelector);
    const cartStatus: string = useAppSelector<Status>(cartStatusSelector);
    // const lineItems: LineItemWithDiscountedPrice[] = cart?.lineItems ?? [];
    const [lineItemsWithAvailability, setLineItemsWithAvailability] = useState<CartItemWithAvailability[]>([]);
    const [showClearCartModal, setShowClearCartModal] = useState(false);
    const [isPromoSubmitted, setIsPromoSubmitted] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAvailablePromoCodesTC());
    }, [dispatch]);

    useEffect(() => {
        if (cart) {
            dispatch(setActivePromoCodeTC(cart));
        }
    }, [dispatch, cart]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
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

    const onSubmit: SubmitHandler<PromoCodeFormData> = async data => {
        const { promoCode } = data;
        setIsPromoSubmitted(true);

        const enteredPromoCodeData = availablePromoCodes.find(
            availablePromoCode => availablePromoCode?.key === promoCode || availablePromoCode.code === promoCode
        );

        if (enteredPromoCodeData) {
            const promoCodeCartContentToStore: PromoCodeCartContent =
                await transformToPromoCodeCartContent(enteredPromoCodeData);
            dispatch(discountActions.setPromoCode({ promoCode: promoCodeCartContentToStore }));
            handleApplyPromoCode(promoCode);
        } else {
            setIsPromoSubmitted(false);
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
                        catalogProduct,
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

    useEffect(() => {
        const subscription = watch((_, { name, type }) => {
            if (name === 'promoCode' && type !== undefined) {
                setIsPromoSubmitted(false);
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [watch]);

    useEffect(() => {
        if (currentPromoCode) {
            const newValue = currentPromoCode?.key ?? currentPromoCode?.code ?? '';
            const currentPromo = getValues('promoCode');

            if (currentPromo !== newValue) {
                reset(
                    {
                        promoCode: newValue,
                    },
                    {
                        keepDirty: true,
                        keepTouched: true,
                    }
                );
                setIsPromoSubmitted(false);
            }
        }
    }, [currentPromoCode, reset, getValues]);

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
        if (cart) {
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
        } else if (
            currentPromoCode &&
            cart &&
            cart?.discountCodes[0]?.discountCode?.id === promoCodeIdToCancel &&
            currentPromoCodeValueInInput &&
            (currentPromoCode?.key === currentPromoCodeValueInInput ||
                currentPromoCode?.code === currentPromoCodeValueInInput)
        ) {
            dispatch(removePromoCodeTC(cart.id, cart.version, currentPromoCodeValueInInput));
            dispatch(discountActions.setPromoCode({ promoCode: null }));
            reset({ promoCode: '' });
        } else if (
            currentPromoCode &&
            cart &&
            currentPromoCodeValueInInput &&
            (currentPromoCode?.key === currentPromoCodeValueInInput ||
                currentPromoCode?.code === currentPromoCodeValueInInput)
        ) {
            dispatch(discountActions.setPromoCode({ promoCode: null }));
            reset({ promoCode: '' });
        }
    };

    const calculateTotalPrice = () => {
        if (!cart) return { original: 0, discounted: 0 };

        let originalTotal = 0;
        let finalDiscountedTotal = 0;

        originalTotal = lineItemsWithAvailability.reduce((total, { item }) => {
            return total + item.price.value.centAmount * item.quantity;
        }, 0);

        finalDiscountedTotal = lineItemsWithAvailability.reduce((total, { item, catalogProduct }) => {
            const hasProductDiscount = catalogProduct?.prices.some(price => price.discounted !== null) ?? false;

            if (hasProductDiscount && catalogProduct) {
                const productDiscountedPriceObject = catalogProduct.prices.find(
                    p => p.value.currencyCode === item.price.value.currencyCode
                )?.discounted;
                if (productDiscountedPriceObject) {
                    return total + productDiscountedPriceObject.value.centAmount * item.quantity;
                }
                return total + item.price.value.centAmount * item.quantity;
            } else {
                return total + (item.discountedPrice?.value.centAmount ?? item.price.value.centAmount) * item.quantity;
            }
        }, 0);

        return {
            original: originalTotal / 100,
            discounted: finalDiscountedTotal / 100,
        };
    };

    const currentPromoCodeValueInInput = getValues('promoCode');
    const isPromoCodeApplied: boolean = checkIsPromoCodeApplied(
        currentPromoCodeValueInInput,
        currentPromoCode,
        availablePromoCodes,
        cart
    );

    const promoProductTypeIds: string[] = currentPromoCode?.productTypeIds ?? [];
    const applicableItems = lineItemsWithAvailability.filter(({ catalogProduct }) => {
        if (!catalogProduct) return false;
        const productTypeId = catalogProduct.productTypeId ?? '';
        if (promoProductTypeIds.length > 0 && promoProductTypeIds.includes(productTypeId)) {
            return true;
        }
        if (promoProductTypeIds.length === 0) return true;
        return false;
    });

    const hasApplicableNonProductDiscountItem = applicableItems.some(({ catalogProduct }) =>
        !catalogProduct?.prices.some(price => price.discounted !== null)
    );
    const isPromoCodeApplicable = applicableItems.length > 0 && hasApplicableNonProductDiscountItem;

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

                {lineItemsWithAvailability.map(({ item, availableQuantity, catalogProduct }) => {
                    const hasProductDiscount = catalogProduct?.prices.some(price => price.discounted !== null) ?? false;
                    return (
                        <CartItem
                            key={item.id}
                            item={item}
                            availableQuantity={availableQuantity}
                            catalogProduct={catalogProduct}
                            showProductDiscountMessage={hasProductDiscount}
                        />
                    );
                })}

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
                                                {isPromoCodeApplied && isPromoCodeApplicable
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
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: !!watch('promoCode'),
                                                },
                                            }}
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
                                        disabled={
                                            !isValid ||
                                            cartStatus === 'loading' ||
                                            isPromoSubmitted ||
                                            isPromoCodeApplied
                                        }
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
                                {cart.discountCodes.length > 0 && isPromoCodeApplied && isPromoCodeApplicable ? (
                                    <>
                                        <Typography className={S.originalPrice} variant="body2">
                                            Original Total: {(calculateTotalPrice().original ?? 0).toFixed(2)} EUR
                                        </Typography>
                                        <Typography className={S.discountedPrice} variant="h6">
                                            Total with discount: {(calculateTotalPrice().discounted ?? 0).toFixed(2)} EUR
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography className={S.cartTotalPrice} variant="h6">
                                        Total: {(calculateTotalPrice().discounted ?? 0).toFixed(2)} EUR
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
