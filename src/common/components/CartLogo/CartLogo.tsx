import type { FC } from 'react';
import S from './CartLogo.module.scss';
import { Link } from 'react-router-dom';
import { PATH } from '../../enums';
import icons from '../../../assets/icons/icons';
import Box from '@mui/material/Box';
import type { CartLogoProps } from './types';

export const CartLogo: FC<CartLogoProps> = ({ counter, size, counterClassName }) => {
    return (
        <Box className={S.cartLogoWrapper}>
            <Link to={PATH.CART}>
                <icons.basket className={S.cartLogo} style={{ height: size }} />
            </Link>
            <span className={counterClassName}>{counter}</span>
        </Box>
    );
};
