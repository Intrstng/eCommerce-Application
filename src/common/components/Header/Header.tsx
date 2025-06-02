import type React from 'react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { motion } from 'framer-motion';
import icons from '../../../assets/icons/icons';
import { CATEGORIES, PATH } from '../../enums';
import Box from '@mui/material/Box';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 35) {
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

    const headerClasses = `${S.header} ${S.fixedHeader} ${isScrolled ? S.solidHeader : ''}`;

    return (
        <motion.div className={headerClasses} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box className={S.header__content}>
                <div className={S.burgerIcon} onClick={handleBurgerClick}>
                    <icons.burger />
                </div>
                <Link to="/">
                    <icons.logo className={S.logo} />
                </Link>
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
                    <LanguageSwitcher />
                    <icons.dox className={S.doxIcon} />
                    <icons.search className={S.searchIcon} />
                    <NavLink to={PATH.SIGNIN} className={S.login}>
                        <icons.login />
                    </NavLink>
                </Box>
            </Box>
            <BurgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        </motion.div>
    );
};
