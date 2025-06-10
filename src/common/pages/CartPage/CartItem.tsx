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
                    <Typography variant="h6" color="primary">
                        {(item.totalPrice.centAmount / 100).toFixed(2)} EUR
                    </Typography>
                </Box>
                <IconButton onClick={handleDelete} className={S.deleteButton}>
                    <img src={deleteIcon} alt="Delete" />
                </IconButton>
            </Box>
        </Card>
    );
};
