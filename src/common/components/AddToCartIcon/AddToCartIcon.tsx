import { STYLES } from './styles.addToCartIcon';
import { addToCartTC, removeFromCartTC } from '../../../features/cart/model/slices/cartSlice';
import icons from '../../../assets/icons/icons';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '../../hooks';
import type { FC } from 'react';
import type { AddToCartIconProps } from './interfaces';
import CircularProgress from '@mui/material/CircularProgress';

export const AddToCartIcon: FC<AddToCartIconProps> = ({
    id,
    variantId,
    isInCart,
    isToCartLoading,
    currentLineItem,
}) => {
    const dispatch = useAppDispatch();

    return (
        <IconButton
            sx={{
                ...STYLES.addToCartButton,
                ...(isInCart && STYLES.inCartButton),
            }}
            onClick={event => {
                event.preventDefault();
                if (isInCart && currentLineItem) {
                    dispatch(removeFromCartTC(currentLineItem.id, id));
                } else {
                    dispatch(addToCartTC(id, variantId));
                }
            }}
        >
            {isToCartLoading ? (
                <CircularProgress size={24} color="inherit" />
            ) : isInCart ? (
                <icons.basketFull />
            ) : (
                <icons.basketEmpty />
            )}
        </IconButton>
    );
};
