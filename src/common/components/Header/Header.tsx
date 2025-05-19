import { PATH } from '../../enums';
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
                <NavLink to={`${PATH.CATALOG}?page=1&type=Earrings`} className={S.navLink}>
                    Earrings
                </NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Ring`} className={S.navLink}>
                    Rings
                </NavLink>
                <NavLink to={`${PATH.CATALOG}?page=1&type=Brooch`} className={S.navLink}>
                    Brooch
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
                    <SignUpButton />
                </div>
            </div>
            <LogoutButton />
        </div>
    );
};
