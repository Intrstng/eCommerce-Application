import type { FC } from 'react';
import S from './CartLogo.module.scss';
import { Link } from 'react-router-dom';
import { PATH } from '../../enums';
import icons from '../../../assets/icons/icons';
import Box from '@mui/material/Box';
import type { CartLogoProps } from './interfaces';

export const CartLogo: FC<CartLogoProps> = ({ counter, size, onClickCB, counterClassName }) => {
    const handleClick = () => {
        if (onClickCB) {
            onClickCB();
        }
    };

    return (
        <Box className={S.cartLogoWrapper}>
            <Link to={PATH.CART} onClick={handleClick}>
                <icons.basket className={S.cartLogo} style={{ height: size }} />
            </Link>
            <span className={counterClassName}>{counter === 0 ? '' : counter}</span>
        </Box>
    );
};
