import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import type { LineItem } from '@commercetools/platform-sdk';
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

type CartItemProps = {
    item: LineItem;
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

    const priceInfo = {
        original: formatPrice(
            [
                {
                    id: 'cart-original-total-price',
                    value: {
                        type: item.price.value.type,
                        currencyCode: item.price.value.currencyCode,
                        centAmount: item.price.value.centAmount * item.quantity,
                        fractionDigits: item.price.value.fractionDigits,
                    },
                    discounted: null,
                },
            ],
            'EUR'
        ),
        discounted: item.price.discounted
            ? formatPrice(
                  [
                      {
                          id: 'cart-discounted-total-price',
                          value: {
                              type: item.price.discounted.value.type,
                              currencyCode: item.price.discounted.value.currencyCode,
                              centAmount: item.price.discounted.value.centAmount * item.quantity,
                              fractionDigits: item.price.discounted.value.fractionDigits,
                          },
                          discounted: null,
                      },
                  ],
                  'EUR'
              )
            : '',
        hasDiscount: !!item.price.discounted,
    };

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
                            {priceInfo.hasDiscount ? (
                                <>
                                    <Typography sx={PRICE_STYLES.price}>{priceInfo.discounted}</Typography>
                                    <Box sx={PRICE_STYLES.oldPriceContent}>
                                        <Typography sx={PRICE_STYLES.oldPrice}>{priceInfo.original}</Typography>
                                        <Box sx={PRICE_STYLES.lineThrough} />
                                    </Box>
                                </>
                            ) : (
                                <Typography sx={PRICE_STYLES.price}>{priceInfo.original}</Typography>
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
