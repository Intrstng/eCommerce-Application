import { CATEGORIES, PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { Logo } from '../Logo/Logo';
import { SignInButton } from '../SignInButton/SignInButton';
import Box from '@mui/material/Box';

export const Header = () => {
    return (
        <Box className={S.header}>
            <Box className={`${S.header__content} container`}>
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

                    <SignInButton />
                </Box>
            </Box>
        </Box>
    );
};
