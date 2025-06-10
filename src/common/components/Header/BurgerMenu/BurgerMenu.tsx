import type React from 'react';
import { useEffect } from 'react';
import S from './BurgerMenu.module.scss';
import icons from '../../../../assets/icons/icons.tsx';
import { Link, NavLink } from 'react-router-dom';
import { CATEGORIES, PATH } from '../../../enums';
import { useAppSelector } from '../../../hooks';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={S.burgerMenuOverlay} onClick={onClose}>
            <motion.div
                className={S.burgerMenuContent}
                onClick={event => {
                    event.stopPropagation();
                }}
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                <div className={S.topBar}>
                    <div className={S.closeIcon} onClick={onClose}>
                        <icons.close />
                    </div>
                    <Link to={PATH.PAGE_ROOT} onClick={onClose}>
                        <icons.logo className={S.logo} />
                    </Link>
                    <Box className={S.cartLogoWrapper}>
                        <Link to={PATH.CART} onClick={onClose}>
                            <icons.basket className={S.logo} />
                        </Link>
                        <Typography variant="subtitle2" component="h6" className={S.cartCounter}>
                            5
                        </Typography>
                    </Box>
                </div>
                <div className={S.navLinks}>
                    <NavLink
                        to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.EARRINGS}`}
                        className={S.navLink}
                        onClick={onClose}
                    >
                        {CATEGORIES.EARRINGS}
                    </NavLink>
                    <NavLink
                        to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.RINGS}`}
                        className={S.navLink}
                        onClick={onClose}
                    >
                        {CATEGORIES.RINGS}
                    </NavLink>
                    <NavLink
                        to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.BROOCHES}`}
                        className={S.navLink}
                        onClick={onClose}
                    >
                        {CATEGORIES.BROOCHES}
                    </NavLink>
                    <NavLink to={PATH.CATALOG} className={S.navLink} onClick={onClose}>
                        ALL PRODUCTS
                    </NavLink>
                    <NavLink to={PATH.ABOUT} className={S.navLink} onClick={onClose}>
                        ABOUT US
                    </NavLink>
                </div>
                {isLoggedIn ? (
                    <NavLink to={PATH.PROFILE_MAIN} className={S.button} onClick={onClose}>
                        ACCOUNT
                    </NavLink>
                ) : (
                    <NavLink to={PATH.SIGNIN} className={S.button} onClick={onClose}>
                        LOG IN
                    </NavLink>
                )}
            </motion.div>
        </div>
    );
};
