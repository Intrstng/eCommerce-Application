import { STYLES } from './styles.addToCartIcon';
import { addToCartTC, removeFromCartTC } from '../../../features/cart/model/slices/cartSlice';
import icons from '../../../assets/icons/icons';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '../../hooks';
import type { FC } from 'react';
import type { AddToCartIconProps } from './interfaces';

export const AddToCartIcon: FC<AddToCartIconProps> = ({ id, variantId, isInCart, currentLineItem }) => {
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
                    dispatch(removeFromCartTC(currentLineItem.id));
                } else {
                    dispatch(addToCartTC(id, variantId));
                }
            }}
        >
            {isInCart ? <icons.basketFull /> : <icons.basketEmpty />}
        </IconButton>
    );
};
