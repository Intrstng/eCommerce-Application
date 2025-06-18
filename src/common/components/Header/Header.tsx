import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { motion } from 'framer-motion';
import icons from '../../../assets/icons/icons';
import { CATEGORIES, PATH } from '../../enums';
import Box from '@mui/material/Box';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { SignInButton } from '../SignInButton/SignInButton';
import { Logo } from '../Logo/Logo';
import { CartLogo } from '../CartLogo/CartLogo';
import { useAppSelector } from '../../hooks';
import { cartSelector } from '../../../features/cart/model/selectors/cartSelectors';
import type { Cart, LineItem } from '@commercetools/platform-sdk';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const cart: Cart | null = useAppSelector(cartSelector);
    const lineItems: LineItem[] = cart?.lineItems || [];

    const cartQuantity = lineItems.reduce((total, item) => total + item.quantity, 0);
    const isHomepage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBurgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <motion.div
            className={`${isHomepage ? S.fixedHeader : S.header} ${isScrolled ? S.solidHeader : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Box className={S.header__content}>
                <div className={S.burgerIcon} onClick={handleBurgerClick}>
                    <icons.burger />
                </div>
                <Logo />
                <Box className={S.nav}>
                    <NavLink to={`${PATH.CATALOG}?productType=Earrings`} className={S.navLink}>
                        {CATEGORIES.EARRINGS}
                    </NavLink>
                    <NavLink to={`${PATH.CATALOG}?productType=Rings`} className={S.navLink}>
                        {CATEGORIES.RINGS}
                    </NavLink>
                    <NavLink to={`${PATH.CATALOG}?productType=Brooches`} className={S.navLink}>
                        {CATEGORIES.BROOCHES}
                    </NavLink>
                    <NavLink to={PATH.ABOUT} className={S.navAboutLink}>
                        <icons.about className={S.doxIcon} />
                    </NavLink>
                    <Box className={S.customerControls}>
                        <SignInButton />
                        <CartLogo counter={cartQuantity} size="1.5rem" counterClassName={S.cartMainCounter} />
                    </Box>
                </Box>
            </Box>
            <BurgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        </motion.div>
    );
};
