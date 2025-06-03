import type React from 'react';
import { useState, useEffect } from 'react';
import styles from './BurgerMenu.module.scss';
import icons from '../../../../assets/icons/icons.tsx';
import { NavLink, Link } from 'react-router-dom';
import { CATEGORIES, PATH } from '../../../enums';
import { useAppSelector } from '../../../hooks';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

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
        <div className={styles.burgerMenuOverlay} onClick={onClose}>
            <motion.div
                className={styles.burgerMenuContent}
                onClick={event => {
                    event.stopPropagation();
                }}
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                <div className={styles.topBar}>
                    <div className={styles.closeIcon} onClick={onClose}>
                        <icons.close />
                    </div>
                    <Link to="/" onClick={onClose}>
                        <icons.logo className={styles.logo} />
                    </Link>
                    <div className={styles.searchIcon}>
                        <SearchIcon />
                    </div>
                </div>
                <div className={styles.navLinks}>
                    <NavLink
                        to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.EARRINGS}`}
                        className={styles.navLink}
                        onClick={onClose}
                    >
                        {CATEGORIES.EARRINGS}
                    </NavLink>
                    <NavLink
                        to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.RINGS}`}
                        className={styles.navLink}
                        onClick={onClose}
                    >
                        {CATEGORIES.RINGS}
                    </NavLink>
                    <NavLink
                        to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.BROOCHES}`}
                        className={styles.navLink}
                        onClick={onClose}
                    >
                        {CATEGORIES.BROOCHES}
                    </NavLink>
                    <NavLink to={PATH.CATALOG} className={styles.navLink} onClick={onClose}>
                        ALL PRODUCTS
                    </NavLink>
                </div>
                <div className={styles.languageSwitcher}>
                    <select value={language} onChange={handleLanguageChange} className={styles.languageSelect}>
                        <option value="en">EN</option>
                        {/*<option value="ru">RU</option>*/}
                    </select>
                </div>
                {isLoggedIn ? (
                    <NavLink to={PATH.PROFILE_MAIN} className={styles.button} onClick={onClose}>
                        ACCOUNT
                    </NavLink>
                ) : (
                    //Add More actions
                    <NavLink to={PATH.SIGNIN} className={styles.button} onClick={onClose}>
                         LOG IN
                    </NavLink>
                )}
            </motion.div>
        </div>
    );
};
