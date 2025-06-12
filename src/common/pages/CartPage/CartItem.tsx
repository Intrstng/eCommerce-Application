import { useAppDispatch } from '../../hooks';
import { removeFromCartTC, updateCartTC } from '../../../features/cart/model/slices/cartSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import type { LineItem } from '@commercetools/platform-sdk';
import S from './CartPage.module.scss';
import deleteIcon from '../../../assets/icons/delete.svg';
import plusIcon from '../../../assets/icons/plus.svg';
import minusIcon from '../../../assets/icons/minus.svg';
import { formatPrice } from '../../../features/catalog/utils/format-price';
import { PRICE_STYLES } from '../../styles/price.styles';

type CartItemProps = {
    item: LineItem;
    availableQuantity?: number;
};

export const CartItem = ({ item, availableQuantity }: CartItemProps) => {
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
        original: formatPrice([{
            id: 'cart-original-total-price',
            value: {
                type: item.price.value.type,
                currencyCode: item.price.value.currencyCode,
                centAmount: item.price.value.centAmount * item.quantity,
                fractionDigits: item.price.value.fractionDigits,
            },
            discounted: null,
        }], 'EUR'),
        discounted: item.price.discounted ? formatPrice([{
            id: 'cart-discounted-total-price',
            value: {
                type: item.price.discounted.value.type,
                currencyCode: item.price.discounted.value.currencyCode,
                centAmount: item.price.discounted.value.centAmount * item.quantity,
                fractionDigits: item.price.discounted.value.fractionDigits,
            },
            discounted: null,
        }], 'EUR') : '',
        hasDiscount: !!item.price.discounted,
    };

    return (
        <Card className={S.cartItem}>
            <Box className={S.cartItemContent}>
                <CardMedia
                    component="img"
                    image={item.variant.images?.[0]?.url}
                    alt={item.name.en}
                    className={S.cartItemImage}
                />
                <Box className={S.cartItemDetails}>
                    <h6 className={S.cartItemTitle}>
                        {item.name.en}
                    </h6>
                    <Box className={S.quantityControl}>
                        <IconButton onClick={handleDecrease} disabled={item.quantity <= 1}>
                            <img src={minusIcon} alt="Decrease" />
                        </IconButton>
                        <p className={S.quantity}>
                            {item.quantity}
                        </p>
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
        </Card>
    );
};
