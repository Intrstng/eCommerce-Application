import { CATEGORIES, PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import S from './Header.module.scss';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { Logo } from '../Logo/Logo';
import { SignInButton } from '../SignInButton/SignInButton';
import { SignUpButton } from '../SignUpButton/SignUpButton';

export const Header = () => {
    // or we can use useSearchParams() here;
    // const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);

    return (
        <div className={S.header}>
            <Logo />
            <div className={S.nav}>
                <NavLink to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.EARRINGS}`} className={S.navLink}>
                    {CATEGORIES.EARRINGS}
                </NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.RINGS}`} className={S.navLink}>
                    {CATEGORIES.RINGS}
                </NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=${CATEGORIES.BROOCHES}`} className={S.navLink}>
                    {CATEGORIES.BROOCHES}
                </NavLink>

                {/*Code below will be added in Sprint #3*/}

                {/*{isLoggedIn ? (*/}
                {/*    <NavLink to={PATH.SIGNIN} onClick={handleLogout}>*/}
                {/*        Logout*/}
                {/*    </NavLink>*/}
                {/*) : (*/}
                {/*    <NavLink to={PATH.SIGNIN}>Login</NavLink>*/}
                {/*)}*/}
                {/*<NavLink to={PATH.SIGNIN} className={isLoggedIn && S.authLinkDisabled}>*/}
                {/*    Login*/}
                {/*</NavLink>*/}
                <div className={S.authButtons}>
                    <SignInButton />
                    <div className={S.divider}></div>
                    <SignUpButton />
                </div>
            </div>
            <LogoutButton />
        </div>
    );
};
