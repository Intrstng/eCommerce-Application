import { useAppDispatch } from '../../hooks';
import { removeFromCartTC } from '../../../features/cart/model/slices/cartSlice';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { LineItem } from '@commercetools/platform-sdk';
import S from './CartPage.module.scss';

type CartItemProps = {
    item: LineItem;
};

export const CartItem = ({ item }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const handleRemove = () => {
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
                    <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {(item.totalPrice.centAmount / 100).toFixed(2)} EUR
                    </Typography>
                </Box>
                <IconButton onClick={handleRemove} className={S.removeButton}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    );
};
