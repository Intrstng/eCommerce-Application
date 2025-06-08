import type React from 'react';
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

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isHomepage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
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
                    <NavLink to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.EARRINGS}`} className={S.navLink}>
                        {CATEGORIES.EARRINGS}
                    </NavLink>
                    <NavLink to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.RINGS}`} className={S.navLink}>
                        {CATEGORIES.RINGS}
                    </NavLink>
                    <NavLink to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.BROOCHES}`} className={S.navLink}>
                        {CATEGORIES.BROOCHES}
                    </NavLink>
                    <icons.dox className={S.doxIcon} />
                    <SignInButton />
                </Box>
            </Box>
            <BurgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        </motion.div>
    );
};
