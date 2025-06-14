import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import S from './CartPage.module.scss';
import noImage from '../../../assets/products/no-image.png';
import { formatPrice } from '../../../features/catalog/utils/format-price';
import { removeFromCartTC, updateCartTC } from '../../../features/cart/model/slices/cartSlice';
import deleteIcon from '../../../assets/icons/delete.svg';
import plusIcon from '../../../assets/icons/plus.svg';
import minusIcon from '../../../assets/icons/minus.svg';
import { PRICE_STYLES } from '../../styles/price.styles';
import type { Status } from 'app/model/types';
import { cartStatusSelector } from '../../../features/cart/model/selectors/cartSelectors';
import { CartItemSkeleton } from './CartItemSkeleton';
import type { LineItemWithDiscountedPrice } from './interfaces';

type CartItemProps = {
    item: LineItemWithDiscountedPrice;
    availableQuantity?: number | undefined;
};

export const CartItem: FC<CartItemProps> = ({ item, availableQuantity }) => {
    const isCartLoading: string = useAppSelector<Status>(cartStatusSelector);
    const dispatch = useAppDispatch();

    const handleIncrease = () => {
        if (availableQuantity === undefined || item.quantity < availableQuantity) {
            dispatch(updateCartTC(item.id, item.quantity + 1));
        }
    };

    const handleDecrease = () => {
        if (item.quantity - 1 === 0) {
            dispatch(removeFromCartTC(item.id));
        } else {
            dispatch(updateCartTC(item.id, item.quantity - 1));
        }
    };

    const handleDelete = () => {
        dispatch(removeFromCartTC(item.id));
    };

    const hasCartDiscount = !!item.discountedPrice;
    const currencyCode = item.price.value.currencyCode;
    const fractionDigits = item.price.value.fractionDigits;

    const getFormattedPrice = (centAmount: number) =>
        formatPrice(
            [
                {
                    id: 'cart-price',
                    value: {
                        type: 'centPrecision',
                        currencyCode,
                        centAmount,
                        fractionDigits,
                    },
                    discounted: null,
                },
            ],
            currencyCode
        );

    const originalPrice = item.price.value.centAmount * item.quantity;
    const originalPriceFormatted = getFormattedPrice(originalPrice);

    const discountedPrice =
        hasCartDiscount && item.discountedPrice ? item.discountedPrice.value.centAmount * item.quantity : originalPrice;
    const discountedPriceFormatted = getFormattedPrice(discountedPrice);

    return (
        <Card className={S.cartItem}>
            {isCartLoading === 'loading' ? (
                <CartItemSkeleton />
            ) : (
                <Box className={S.cartItemContent}>
                    <CardMedia
                        component="img"
                        image={item.variant.images?.[0]?.url || noImage}
                        alt={item.name.en}
                        className={S.cartItemImage}
                    />
                    <Box className={S.cartItemDetails}>
                        <Typography variant="h6" className={S.cartItemTitle}>
                            {item.name.en}
                        </Typography>
                        <Box className={S.quantityControl}>
                            <IconButton onClick={handleDecrease} disabled={item.quantity <= 1}>
                                <img src={minusIcon} alt="Decrease" />
                            </IconButton>
                            <Typography variant="body2" className={S.quantity}>
                                {item.quantity}
                            </Typography>
                            <IconButton
                                onClick={handleIncrease}
                                disabled={availableQuantity !== undefined && item.quantity >= availableQuantity}
                            >
                                <img src={plusIcon} alt="Increase" />
                            </IconButton>
                        </Box>
                        <Box sx={PRICE_STYLES.priceContent}>
                            {hasCartDiscount ? (
                                <>
                                    <Typography sx={PRICE_STYLES.price}>{discountedPriceFormatted}</Typography>
                                    <Box sx={PRICE_STYLES.oldPriceContent}>
                                        <Typography sx={PRICE_STYLES.oldPrice}>{originalPriceFormatted}</Typography>
                                        <Box sx={PRICE_STYLES.lineThrough} />
                                    </Box>
                                </>
                            ) : (
                                <Typography sx={PRICE_STYLES.price}>{originalPriceFormatted}</Typography>
                            )}
                        </Box>
                    </Box>
                    <IconButton onClick={handleDelete} className={S.deleteButton}>
                        <img src={deleteIcon} alt="Delete" />
                    </IconButton>
                </Box>
            )}
        </Card>
    );
};
