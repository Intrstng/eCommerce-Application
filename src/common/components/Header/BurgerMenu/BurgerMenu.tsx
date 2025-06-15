import type React from 'react';
import { useEffect } from 'react';
import S from './BurgerMenu.module.scss';
import icons from '../../../../assets/icons/icons.tsx';
import { Link, NavLink } from 'react-router-dom';
import { CATEGORIES, PATH } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { motion } from 'framer-motion';
import { CartLogo } from '../../CartLogo/CartLogo';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { cartSelector } from '../../../../features/cart/model/selectors/cartSelectors';
import { logOutTC } from '../../../../features/auth/model/slices/authSlice';

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const cart: Cart | null = useAppSelector(cartSelector);
    const lineItems: LineItem[] = cart?.lineItems || [];
    const dispatch = useAppDispatch();

    const cartQuantity = lineItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLogout = () => {
        dispatch(logOutTC());
        onClose();
    };

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
                    <CartLogo
                        counter={cartQuantity}
                        size="1.875rem"
                        counterClassName={S.cartBurgerCounter}
                        onClickCB={onClose}
                    />
                </div>
                <div className={S.navLinks}>
                    <NavLink to={`${PATH.CATALOG}?productType=Earrings`} className={S.navLink} onClick={onClose}>
                        {CATEGORIES.EARRINGS}
                    </NavLink>
                    <NavLink to={`${PATH.CATALOG}?productType=Rings`} className={S.navLink} onClick={onClose}>
                        {CATEGORIES.RINGS}
                    </NavLink>
                    <NavLink to={`${PATH.CATALOG}?productType=Brooches`} className={S.navLink} onClick={onClose}>
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
                    <>
                        <NavLink to={PATH.PROFILE_MAIN} className={S.button} onClick={onClose}>
                            ACCOUNT
                        </NavLink>
                        <NavLink to={PATH.SIGNIN} onClick={handleLogout} aria-label="logout" className={S.button}>
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <NavLink to={PATH.SIGNIN} className={S.button} onClick={onClose}>
                        LOG IN
                    </NavLink>
                )}
            </motion.div>
        </div>
    );
};
